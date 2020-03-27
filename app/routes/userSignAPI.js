/* eslint-disable no-var */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable new-cap */
const express = require('express');
const app = express();
const router = express.Router();
const crypto = require('crypto');
const bodyParser = require('body-parser');
const request = require('request');
const multer = require('multer');
const query = require('../model/sql');
app.use(bodyParser.urlencoded({exetended: false}));
app.use(bodyParser.json());

// Multer Storage Setting
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.jpg');
    },
});

var upload = multer({storage: storage});

router.get('/profile', async (req, res, cb) => {
    // Get token in headers
    const token = req.headers.authorization.split(' ')[1];

    // Get data from stylish DB
    const profile_query_user_result = await query.selectTableArr('user', 'token', `"${token}"`);
    const profile_query_user_data = Object.values(profile_query_user_result)[0];

    // assemble data
    let sendbackObject = {};

    if (profile_query_user_result.length > 0) { // data get
        if ((Date.now() - parseInt(profile_query_user_data.time_now)) < parseInt(profile_query_user_data.expired_time) * 1000) { // in-time
            sendbackObject = {
                data: {
                    id: profile_query_user_data.user_id,
                    provider: `"${profile_query_user_data.provider}"`,
                    name: `"${profile_query_user_data.name}"`,
                    email: `"${profile_query_user_data.email}"`,
                    picture: `"${profile_query_user_data.picture}"`,
                },
            };
            res.status(200).json(sendbackObject);
        } else {
            res.status(403).json({
                errorMessage: 'Time expired',
            });
            cb();
        }
    } else {
        sendbackObject.errorMessage = 'Invalid access, this token match nothing';
        res.status(403).json(sendbackObject);
        cb();
    }
});

router.post('/:type', upload.single('picture'), async (req, res, cb) => {
    // Block wrong params input (DONE)
    if (!(req.params.type === 'signup' || req.params.type === 'signin')) {
        res.status(400).json({
            errorMessage: 'plz enter correct params: /signup /signin',
        });
        return cb('plz enter correct params: /signup /signin');
    }

    // Set connection here

    // Check double email (Sign-up) or Account email exist (Sign-in)
    if (req.body.password && req.body.email) {
        // Get user info in stylish DB
        var query_user_data_result = await query.selectTableArr('user', 'email', `"${req.body.email}"`);

        // Check double email
        var doubleEmail;
        if (query_user_data_result.length > 0) {
            doubleEmail = true;
        } else if (query_user_data_result.length === 0) {
            doubleEmail = false;
        }

        // Make send back token
        var send_back_token_native = crypto.createHash('sha256').update(req.body.email + Date.now().toString()).digest('hex');
        console.log('send_back_token_native : ' + send_back_token_native);

        // create password hash data
        var user_password_token = crypto.createHash('sha256').update(req.body.password, 'utf8').digest('hex');
        console.log('user_password_token : ' + user_password_token);
    }

    // Start sign in / sign up process
    if (req.params.type === 'signup' && doubleEmail) {
        res.status(403).json({
            errorMessage: 'Email already exist, plz use another email',
        });
        return cb('Email already exist, plz use another email');
    } else if (req.params.type === 'signin' && !doubleEmail && req.body.provider !== 'facebook') {
        res.status(403).json({
            errorMessage: 'No account exist, plz check email again',
        });
        return cb('No account exist, plz check email again');
    } else if (req.params.type === 'signup' && !doubleEmail) {
        // Sign Up process

        // // Multer
        // const file = req.file;
        // if (!file) {
        //     const error = new Error('Please upload a file');
        //     error.httpStatusCode = 400;
        //     return next(error);
        // } else {
        //     console.log(file);
        // }

        // // Picture process
        // let picture_url;
        // if (!file) {
        //     picture_url = '';
        // } else {
        //     picture_url = file.path;
        // }

        // Put in body data (name, email, password)
        await query.insertTable('user', {
            provider: `"native"`,
            name: `"${req.body.name}"`,
            email: `"${req.body.email}"`,
            password: `"${user_password_token}"`,
            time_now: `"${Date.now().toString()}"`,
            token: `"${send_back_token_native}"`,
            expired_time: `"3600"`,
        });

        const reFetch_user_result = await query.selectTableArr('user', 'email', `"${req.body.email}"`); // {{},}
        var userObject_fromStylish = Object.values(reFetch_user_result)[0]; // {}
    } else if (req.params.type === 'signin' && (doubleEmail || req.body.provider === 'facebook')) {
        // Sign In process

        // Set query user SQL
        if (req.body.provider === 'native') {
            // native sign in
            // Get DB user info
            var userObject_fromStylish = Object.values(query_user_data_result)[0]; // {}

            // User password not identical => Exit 3
            if (user_password_token !== userObject_fromStylish.password) {
                res.status(403).json({
                    errorMessage: 'Wrong Password, plz check again',
                });
                return cb('Wrong Password, plz check again');
            }

            // Make Update SQL
            await query.updateTable('user', 'email', `"${req.body.email}"`, {
                token: `"${send_back_token_native}"`,
                time_now: `"${Date.now().toString()}"`,
            });
        } else if (req.body.provider === 'facebook') { // FB route
            // use token to get data from facebook

            // Make fetch data request to FB server w/ token
            const FBRequestPromise = new Promise((resolve, reject) => {
                // request framework
                const FB_request_url = `https://graph.facebook.com/v5.0/me?fields=name,picture,email&access_token=${req.body.access_token}`;
                request(FB_request_url, (error, response, body) => {
                    if (error) throw err;
                    resolve(body);
                });
            });
            const FB_requset_result = FBRequestPromise;
            const FB_requset_result_JSON = JSON.parse(FB_requset_result);

            // Make FB token
            var send_back_token_FB = crypto.createHash('sha256').update(FB_requset_result_JSON.email + Date.now()).digest('hex');
        };
    } else {
        res.status(403).json({
            errorMessage: 'something wrong before went in sign-in / sign-up',
        });
        return cb('noo');
    }

    // Make user object for FB and native route
    let userObject_in_responseObject = {};

    if (req.body.provider !== 'facebook') {
        userObject_in_responseObject = {
            id: userObject_fromStylish.user_id,
            provider: userObject_fromStylish.provider,
            name: userObject_fromStylish.name,
            email: userObject_fromStylish.email,
            picture: userObject_fromStylish.picture,
        };
    } else {
        // Update data from new query of FB
        // Check if user exist
        const FBcheckResult = uery.selectTableArr('user', 'email', `"${FB_requset_result_JSON.email}"`);
        if (FBcheckResult.length === 0) {
            // If not existed, insert user info
            await query.insertTable('user', {
                provider: `"facebook"`,
                name: `"${FB_requset_result_JSON.name}"`,
                email: `"${FB_requset_result_JSON.email}"`,
                time_now: `"${Date.now().toString()}"`,
                token: `"${send_back_token_FB}"`,
                expired_time: `"3600"`,
                picture: `"${FB_requset_result_JSON.picture.data.url}"`,
            });
        } else {
            // If existed, update user info
            await query.updateTable('user', 'email', `"${FB_requset_result_JSON.email}"`, {
                name: `"${FB_requset_result_JSON.name}"`,
                email: `"${FB_requset_result_JSON.email}"`,
                picture: `"${FB_requset_result_JSON.picture.data.url}"`,
                token: `"${send_back_token_FB}"`,
                time_now: `"${Date.now().toString()}"`,
            });
        }

        // Get user info from stylish DB again
        const FBcheckResult2 = await query.selectTableArr('user', 'email', `"${FB_requset_result_JSON.email}"`);
        userObject_in_responseObject = {
            id: Object.values(FBcheckResult2)[0].user_id,
            provider: 'facebook',
            name: FB_requset_result_JSON.name,
            email: FB_requset_result_JSON.email,
            picture: FB_requset_result_JSON.picture.data.url,
        };
    }

    // Send response object back
    res.status(200).json({
        data: {
            access_token: send_back_token_FB || send_back_token_native,
            access_expired: 3600,
            user: userObject_in_responseObject,
        },
    });
});

module.exports = router;
