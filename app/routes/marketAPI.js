/* eslint-disable max-len */
/* eslint-disable object-curly-spacing */
/* eslint-disable require-jsdoc */
/* eslint-disable camelcase */
const express = require('express');
const app = express();
// eslint-disable-next-line new-cap
const router = express.Router();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ exetended: true }));
const redis = require('redis');
const client = redis.createClient(6379);
const query = require('../model/sql');

function findCache(req, res, next) {
    const { marketStuff } = req.params;
    client.get(marketStuff, (err, data) => {
        if (err) throw err;
        if (data !== null) {
            // Cache existed
            console.log('cache get');
            res.status(200).send(data);
        } else {
            // Create cache in query
            next();
        }
    });
};

router.get('/:marketStuff', findCache, async (req, res, cb) => {
    // const con = mysql.createConnection({
    //     host: 'localhost',
    //     user: 'stylishadd',
    //     // how to use pwd safely? => dotenv
    //     password: '0000',
    //     database: 'stylish',
    // });

    // con.connect(function() {});

    // Make Market Sutff Query
    if (req.params.marketStuff === 'campaigns') {
        const campaignResult = query.selectTableArr('campaign');
        const campaignResultArr = Object.values(campaignResult);
        const sendbackArr = [];

        // Assemble data array
        for (let i = 0; i < campaignResultArr.length; i++) {
            const campaignObj = {
                product_id: campaignResultArr[i].product_id,
                picture: campaignResultArr[i].picture,
                story: campaignResultArr[i].story,
            };
            sendbackArr.push(campaignObj);
        };

        client.set('campaigns', JSON.stringify(sendbackArr));

        res.status(200).json(sendbackArr);
    } else if (req.params.marketStuff === 'hots') {
        // Query from hot table
        const hotResult = query.selectTableArr('hot');
        const hotResultArr = Object.values(hotResult);
        const dataArr = [];
        // For each hot, query products where hot = "hot", and push products into data array
        for (let i = 0; i < hotResultArr.length; i++) {
            const hotObj = {
                title: hotResultArr[i].hot,
                products: [],
            };

            // Call product API to get product array
            const productResult = query.selectTableArr('product', 'hot', `"${hotResultArr[i].hot}"`);
            const productResultArr = Object.values(productResult);
            for (const product of productResultArr) {
                // Get needed products for each hot

                // images
                console.log(product.product_id);
                const imagesResult = query.selectTableArr('product_images', 'product_id', `${product.product_id}`);
                const imagesResultArr = Object.values(imagesResult);
                const images = [];
                for (const image of imagesResultArr) {
                    images.push(`http://3.134.125.243/${image.images}`);
                }

                // colors
                const colors = [];
                const product_color_querySQL = `SELECT color.color_code AS code, PC.color AS name FROM product_color AS PC JOIN color ON PC.color = color.color WHERE product_id = "${product.product_id}"`;
                const product_color_promise = new Promise((resolve)=> {
                    query.pool.query(product_color_querySQL, (err, result)=> {
                        // console.log(result); // [{},]
                        resolve(result); //
                    });
                });
                const product_color_promise_result = product_color_promise; // object
                for (let i =0; i < product_color_promise_result.length; i++) {
                    colors.push(product_color_promise_result[i]);
                }

                // sizes
                const sizeResult = query.selectTableArr('product_size', 'product_id', `${product.product_id}`);
                const sizeResultArr = Object.values(sizeResult);
                const sizes = [];
                for (const size of sizeResultArr) {
                    sizes.push(size.size);
                }

                // variants
                const variants = [];
                const variant_querySQL = `SELECT color.color_code, variant.size, variant.stock FROM variant JOIN color ON color.color = variant.color WHERE product_id = "${product.product_id}"`;
                const variant_promise = new Promise((resolve)=> {
                    query.pool.query(variant_querySQL, (err, result)=> {
                        // console.log(result); // [{},]
                        resolve(result); //
                    });
                });
                const variant_promise_result = variant_promise; // object
                for (let i =0; i < variant_promise_result.length; i++) {
                    variants.push(variant_promise_result[i]);
                }

                hotObj.products.push({
                    id: product.id,
                    title: product.title,
                    description: product.description,
                    price: product.price,
                    texture: product.texture,
                    wash: product.wash,
                    place: product.place,
                    note: product.note,
                    story: product.story,
                    colors: colors,
                    sizes: sizes,
                    variants: variants,
                    main_image: `http://3.134.125.243/${product.main_image}`,
                    images: images,
                });
            }
            dataArr.push(hotObj);
        }

        // Set Cache
        client.set('hots', JSON.stringify({ data: dataArr }));

        res.status(200).json({
            data: dataArr,
        });
    } else {
        res.send('plz enter correct params: /campaigns /hots');
    }
});

module.exports = router;
