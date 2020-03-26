/* eslint-disable brace-style */
/* eslint-disable camelcase */
/* eslint-disable max-len */
/* eslint-disable new-cap */
// Init
const express = require('express');
const router = express.Router();
const query = require('../model/sql');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

// Set multer config (destination & file name)
const s3 = new aws.S3();
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'stylishelvin',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key: function (req, file, cb) {
            console.log(file);
            cb(null, Date.now().toString());
        },
    }),
});
// Uploading multiple files
const cpUpload = upload.fields([{ name: 'main_image', maxCount: 1 }, { name: 'images', maxCount: 3 }]);

router.post('/admin/addProduct', cpUpload, (req, res, next) => {
    const files = req.files;

    // check users upload pics
    if (!files) {
        const error = new Error('Please choose files');
        error.httpStatusCode = 400;
        return next(error);
    }

    query.con.beginTransaction( async (error) => {
        if (error) {
            throw error;
        };

        // Check double ID
        const checkDoubleResult = await query.selectTableArr('product', 'product_id', req.body.product_id, null, null, true);
        if (checkDoubleResult.length !== 0) {
            res.send('Double ID, new data does not generate');
        } else if (checkDoubleResult instanceof Error) {
            query.con.rollback(() => {
                throw checkDoubleResult;
            });
        } else {
            // *******************
            //  1st upload (DONE)
            // *******************
            const uploadKeyArr = ['texture', 'wash', 'place', 'note', 'type', 'hot'];
            const uploadValueArr = [req.body.texture, req.body.wash, req.body.place, req.body.note, req.body.type, req.body.hot];
            for (let i = 0; i < uploadKeyArr.length; i++) {
                const _1stResult = await query.selectTableArr(uploadKeyArr[i], uploadKeyArr[i], `"${uploadValueArr[i]}"`);
                if (_1stResult instanceof Error) {
                    query.con.rollback(()=>{
                        throw _1stResult;
                    });
                };
                if (_1stResult.length === 0) {
                    await query.insertTable(uploadKeyArr[i], {
                        [uploadKeyArr[i]]: `"${uploadValueArr[i]}"`,
                    });
                }
            }

            // *******************
            //  2nd upload (DONE) product
            // *******************

            // Second upload group ( Product, Color, Sizes )
            const newProductObject = {
                product_id: req.body.product_id,
                title: `"${req.body.title}"`,
                description: `"${req.body.description}"`,
                price: req.body.price,
                texture: `"${req.body.texture}"`,
                wash: `"${req.body.wash}"`,
                place: `"${req.body.place}"`,
                note: `"${req.body.note}"`,
                story: `"${req.body.story}"`,
                type: `"${req.body.type}"`,
                hot: `"${req.body.hot}"`,
            };

            // set main_image url if exist
            if (!files.main_image) {
                newProductObject.main_image = '""';
            } else {
                newProductObject.main_image = `"${files.main_image[0].key}"`;
            }

            const insertResult = await query.insertTable('product', newProductObject);
            if (insertResult instanceof Error) {
                query.con.rollback(()=>{
                    throw insertResult;
                });
            };
            // *******************
            //  3rd upload (DONE) color & size collection
            // *******************
            // Build color collection
            for (let i = 0; i < req.body.colors.split(',').length; i++) {
                const colorcheckResult = await query.selectTableArr('color', 'color', `"${req.body.colors.split(',')[i]}"`);
                if (colorcheckResult instanceof Error) {
                    query.con.rollback(()=>{
                        throw colorcheckResult;
                    });
                };
                if (colorcheckResult.length === 0) {
                    await query.insertTable('color', {
                        color: `"${req.body.colors.split(',')[i]}"`,
                        color_code: `"${req.body.colorscode.split(',')[i]}"`,
                    });
                };
            };

            // Build size collection
            for (let j = 0; j < req.body.sizes.split(',').length; j++) {
                const sizecheckResult = await query.selectTableArr('size', 'size', `"${req.body.sizes.split(',')[j]}"`);
                if (sizecheckResult instanceof Error) {
                    query.con.rollback(()=>{
                        throw sizecheckResult;
                    });
                };
                if (sizecheckResult.length === 0) {
                    await query.insertTable('size', {
                        size: `"${req.body.sizes.split(',')[j]}"`,
                        size_info: `"${req.body.sizesinfo.split(',')[j]}"`,
                    });
                };
            };

            // *******************
            //  4th upload (DONE) product color, size & images
            // *******************

            const imagesArr = [];
            if (!files.images) {
                // console.log('no images upload');
            } else {
                for (let i = 0; i < files.images.length; i++) {
                    imagesArr.push(files.images[i].key);
                }
            }
            const productInfoKeyArr = ['product_color', 'product_size', 'product_images'];
            const productColumnArr = ['color', 'size', 'images'];
            const productInfoValueArr = [req.body.colors.split(','), req.body.sizes.split(','), imagesArr];
            console.log(productInfoValueArr.length);
            // count tables
            for (let i = 0; i < productInfoKeyArr.length; i++) {
                // count info
                for (let j = 0; j < productInfoValueArr[i].length; j++) {
                    const insertResult = await query.insertTable(productInfoKeyArr[i], {
                        product_id: req.body.product_id,
                        [productColumnArr[i]]: `"${productInfoValueArr[i][j]}"`,
                    });
                    if (insertResult instanceof Error) {
                        query.con.rollback(()=>{
                            throw insertResult;
                        });
                    };
                };
            };

            // *******************
            //  5th upload (DONE) Variants
            // *******************
            const variantObjectAmount = req.body.colors.split(',').length * req.body.sizes.split(',').length;
            for (let i = 0; i < variantObjectAmount; i++) {
                const insertResult = await query.insertTable('variant', {
                    product_id: req.body.product_id,
                    stock: req.body[`variants_stock${i}`],
                    color: `"${req.body[`variants_color${i}`]}"`,
                    size: `"${req.body[`variants_size${i}`]}"`,
                });
                if (insertResult instanceof Error) {
                    query.con.rollback(()=>{
                        throw insertResult;
                    });
                };
            }

            res.status(200).send(insertResult);
            query.con.commit();
        }
    });
});

module.exports = router;
