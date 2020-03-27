/* eslint-disable require-jsdoc */
/* eslint-disable new-cap */
/* eslint-disable max-len */
/* eslint-disable camelcase */

// Init
const express = require('express');
const query = require('../model/sql');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const redis = require('redis');
const client = redis.createClient(6379);
app.use(bodyParser.urlencoded({exetended: true}));

// Deal empty type param
router.get('/', (req, res) => {
    res.redirect('/api/V1.0/products/all?page=0');
});

function findCache(req, res, next) {
    const { type } = req.params;
    const { id } = req.query;
    client.get(`${type}-${id}`, (err, data) => {
        if (err) throw err;
        if (data !== null) {
            // Cache existed
            console.log('cache get :' + type + '-' + id);
            res.status(200).send(data);
        } else {
            // Create cache in query
            next();
        }
    });
};

// Deal types
router.get('/:type', findCache, async (req, res) => {
    // 1. Generate query string
    let selectAllProductSQL = '';
    if (req.params.type === 'all' ) {
        selectAllProductSQL = `SELECT * FROM product`;
    } else if (req.params.type === 'women') {
        selectAllProductSQL = `SELECT * FROM product WHERE type = "women"`;
    } else if (req.params.type === 'men') {
        selectAllProductSQL = `SELECT * FROM product WHERE type = "men"`;
    } else if (req.params.type === 'accessories') {
        selectAllProductSQL = `SELECT * FROM product WHERE type = "accessories"`;
    } else if (req.params.type === 'details' && req.query.id) {
        selectAllProductSQL = `SELECT * FROM product WHERE product_id = "${req.query.id}"`;
    } else if (req.params.type === 'search' && req.query.keyword ) {
        selectAllProductSQL = `SELECT * FROM product WHERE title LIKE "%${req.query.keyword}%"`;
    } else {
        res.status(400).send('plz enter correct params: /all /women /men /accessories /search?weyword=[anything] /details?id=[anything]');
    }

    // 2. Get page info
    let currentPage_INT;
    // Check if user type page
    if (!req.query.page) {
        currentPage_INT = 0;
    } else if (req.query.page) {
        currentPage_INT = parseInt(req.query.page, 10);
    } else {
        console.error('can not set value to currentPage_INT');
    }

    // 3. Add page info to sql ( 3 items per page)
    selectAllProductSQL += ` LIMIT ${6*currentPage_INT}, 6`;

    // 4. Promise for product query
    const queryProductPromise = new Promise((resolve)=> {
        query.pool.query(selectAllProductSQL, (err, result)=> {
            resolve(result); // result => object
        });
    });

    const productQueryResult = await queryProductPromise; // productQueryResult => object

    // ------------ Total line start ------------
    // Set empty response object
    const responseObject = {
        data: [],
    };

    // Detail for empty product block logic
    if (productQueryResult.length === 0 && req.params.type === 'details') {
        responseObject.emptyProductMessage = 'No such product ID, plz key in correct product ID';
    }

    // Generate next_paging value
    let nextpage_value;
    // if no data left : nextpage_value = ''
    if ( productQueryResult.length < 6) { // productQueryResult.length < 3
        console.log('no next page');
    } else if (productQueryResult.length === 6) { // productQueryResult.length === 3
        nextpage_value = currentPage_INT+1;
        responseObject.next_paging = nextpage_value;
        // if total data amount is multiple of 3, next_paging of empty data situation will happen
    } else {
        console.error('Problem in generate next_paging part');
    }

    // ----- Each product object start ------
    // eslint-disable-next-line guard-for-in
    for (const key in productQueryResult ) {
        // 1. Set 4 query promise object for each product object value (product_color, product_size, product_images, varient)
        const object_WhichGoIntoDataArray = {
            id: productQueryResult[key].product_id,
            title: productQueryResult[key].title,
            description: productQueryResult[key].description,
            price: productQueryResult[key].price,
            texture: productQueryResult[key].texture,
            wash: productQueryResult[key].wash,
            place: productQueryResult[key].place,
            note: productQueryResult[key].note,
            story: productQueryResult[key].story,
            colors: [],
            sizes: [],
            variants: [],
            main_image: '',
            images: [],
        };

        // product_color
        const product_color_querySQL = `SELECT color.color_code AS code, PC.color AS name FROM product_color AS PC JOIN color ON PC.color = color.color WHERE product_id = "${productQueryResult[key].product_id}"`;
        const product_color_promise = new Promise((resolve)=> {
            query.pool.query(product_color_querySQL, (err, result)=> {
                // console.log(result); // [{},]
                resolve(result); //
            });
        });
        const product_color_promise_result = await product_color_promise; // object
        for (let i =0; i < product_color_promise_result.length; i++) {
            object_WhichGoIntoDataArray.colors.push(product_color_promise_result[i]);
        }

        // product_size
        const product_size_promise_result = await query.selectTableArr('product_size', 'product_id', `${productQueryResult[key].product_id}`);
        for (let i =0; i < product_size_promise_result.length; i++) {
            put_in_size = product_size_promise_result[Object.keys(product_size_promise_result)[i]].size;
            object_WhichGoIntoDataArray.sizes.push(put_in_size);
        }

        // product_images
        const product_images_promise_result = await query.selectTableArr('product_images', 'product_id', `${productQueryResult[key].product_id}`); // object
        for (let i =0; i < product_images_promise_result.length; i++) {
            correctImagesURL = `https://d24ogzkheidvyy.cloudfront.net/${product_images_promise_result[Object.keys(product_images_promise_result)[i]].images}`;
            object_WhichGoIntoDataArray.images.push(correctImagesURL);
        }

        // variant
        const variant_querySQL = `SELECT color.color_code, variant.size, variant.stock FROM variant JOIN color ON color.color = variant.color WHERE product_id = "${productQueryResult[key].product_id}"`;
        const variant_promise = new Promise((resolve)=> {
            query.pool.query(variant_querySQL, (err, result)=> {
                resolve(result); //
            });
        });
        const variant_promise_result = await variant_promise; // object
        for (let i =0; i < variant_promise_result.length; i++) {
            object_WhichGoIntoDataArray.variants.push(variant_promise_result[i]);
        }

        // 2. Put everything into object_WhichGoIntoDataArray
        if (productQueryResult[key].main_image) {
            object_WhichGoIntoDataArray.main_image = `https://d24ogzkheidvyy.cloudfront.net/${productQueryResult[key].main_image}`;
        }

        // finish object_WhichGoIntoDataArray assemble
        if (req.params.type === 'details' && req.query.id) {
            responseObject.data = object_WhichGoIntoDataArray;
        } else {
            responseObject.data.push(object_WhichGoIntoDataArray);
        }
    }

    if (req.params.type === 'details' && req.query.id && productQueryResult[0]) {
        client.setex(`${req.params.type}-${req.query.id}`, 3600, JSON.stringify(responseObject));
    }

    res.status(200).json(responseObject);
});

module.exports = router;
