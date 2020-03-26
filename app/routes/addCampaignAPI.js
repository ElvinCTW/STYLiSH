/* eslint-disable camelcase */
/* eslint-disable max-len */
// TO DO :
// Add update and delete fucntion

// Init
const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const multer = require('multer');
const redis = require('redis');
const client = redis.createClient(6379);
const query = require('../model/sql');

// Set multer config (destination & file name)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `public/images/uploads`);
        // cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + '.jpg');
        // main.jpg
    },
});

const upload = multer({storage: storage});
// Uploading multiple files
const cpUpload = upload.fields([{name: 'picture', maxCount: 1}]);

router.post('/admin/addCampaign', cpUpload, async (req, res, next) => {
    console.log('in router post');
    const files = req.files;

    // check users upload pics
    if (!files) {
        const error = new Error('Please choose files');
        error.httpStatusCode = 400;
        return next(error);
    }

    // ***************************************************
    //  1. Check double campaign in campaign table (DONE)
    // ***************************************************
    let doUpload = true; // if true => make upload request
    const check_double_ID_result = await query.selectTableArr('campaign', 'product_id', `"${req.body.product_id}"`);
    if ( check_double_ID_result.length > 0) {
        doUpload = false; // Turn off upload , return double campaign message
        res.send('Error, Double campaign for same ID, new campaign does not generate');
    }

    // *******************************************
    //  2. Check ID exist in product table (DONE)
    // *******************************************
    const check_ID_exist_Result = await query.selectTableArr('product', 'product_id', `"${req.body.product_id}"`);
    if ( check_ID_exist_Result.length === 0) { // no product exist
        doUpload = false; // Turn off upload , return double campaign message
        res.send('Error, no such a product in database, new campaign does not generate');
    }

    if (doUpload) {
        // Make upload object

        // Add picture url to upload object
        let picture_url;
        if (!files.picture) {
            picture_url = '';
        } else {
            picture_url = `http://localhost:3000/${files.picture[0].path}`;
            // picture_url = `http://3.134.125.243/${files.picture[0].path}`;
        }

        await query.insertTable('campaign', {
            product_id: req.body.product_id,
            story: `"${req.body.story}"`,
            picture: `"${picture_url}"`,
        });

        // Get upload feedback
        const client_feedback_result = await query.selectTableArr('campaign', 'product_id', `${req.body.product_id}`);
        client.del('campaigns');
        res.send(client_feedback_result);
    }
});

module.exports = router;
