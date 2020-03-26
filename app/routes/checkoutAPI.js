/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable padded-blocks */
/* eslint-disable max-len */
const express = require('express');
const app = express();
// eslint-disable-next-line new-cap
const router = express.Router();
const bodyParser = require('body-parser');
const https = require('https');
const query = require('../model/sql');
const axios = require('axios').default;
app.use(bodyParser.urlencoded({ exetended: false }));
app.use(bodyParser.json());


router.post('/checkout', async (req, res, cb) => {
    const sendback = { data: {} };

    const orderObj = {
        shipping: `"${req.body.order.shipping}"`,
        payment: `"${req.body.order.payment}"`,
        subtotal: `"${req.body.order.subtotal}"`,
        freight: `"${req.body.order.freight}"`,
        total: `"${req.body.order.total}"`,
        name: `"${req.body.order.recipient.name}"`,
        phone: `"${req.body.order.recipient.phone}"`,
        email: `"${req.body.order.recipient.email}"`,
        address: `"${req.body.order.recipient.address}"`,
        time: `"${req.body.order.recipient.time}"`,
        pay_yet: `"not_yet"`,
    };

    // Get token from header
    if (req.headers.authorization) {
        orderObj.token = `"${req.headers.authorization.split(' ')[1]}"`;
        const userinfoResult = await axios({
            method: 'get',
            url: '/api/V1.0/user/profile',
            proxy: {
                port: 3000,
            },
            headers: {
                Authorization: req.headers.authorization,
            },
        });
        orderObj.user_id = userinfoResult.data.data.id;
        console.log(userinfoResult);
    } else {
        orderObj.token = '"does not login"';
        orderObj.user_id = 35;
    }

    // Insert order into stylish_order table
    const stylish_orderDB_Result = await query.insertTable('stylish_order', orderObj);
    console.log(stylish_orderDB_Result);

    // Connect with tappay server and get feedback
    const tappayPostData = {
        'prime': req.body.prime,
        'partner_key': 'partner_PHgswvYEk4QY6oy3n8X3CwiQCVQmv91ZcFoD5VrkGFXo8N7BFiLUxzeG',
        'merchant_id': 'AppWorksSchool_CTBC',
        'amount': req.body.order.total,
        'currency': 'TWD',
        'order_number': stylish_orderDB_Result.insertId,
        'bank_transaction_id': `STYLISHELVIN${stylish_orderDB_Result.insertId}`,
        'details': 'TapPay Test',
        'cardholder': {
            'phone_number': req.body.order.recipient.phone,
            'name': req.body.order.recipient.name,
            'email': req.body.order.recipient.email,
            'address': req.body.order.recipient.address,
        },
    };

    console.log(tappayPostData);

    const tappayPostOption = {
        host: 'sandbox.tappaysdk.com',
        port: 443,
        path: '/tpc/payment/pay-by-prime',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // 這個參數必須要帶上去，否則不會過
            'x-api-key': 'partner_PHgswvYEk4QY6oy3n8X3CwiQCVQmv91ZcFoD5VrkGFXo8N7BFiLUxzeG',
        },
    };

    const tappayPostReq = https.request(tappayPostOption, function (response) {
        response.setEncoding('utf8');
        response.on('data', async function (body) {
            // Put data from tappay server into payment table
            tappayPostResultJSON = JSON.parse(body);

            // If pay error, send message back
            if (tappayPostResultJSON.status !== 0) {

                // Insert order_item table
                await query.insertTable('order_items', {
                    order_id: stylish_orderDB_Result.insertId,
                    product_id: req.body.list[0].id,
                    product_color: `"${req.body.list[0].color.name}"`,
                    product_size: `"${req.body.list[0].size}"`,
                    product_value: req.body.list[0].qty,
                });

                // Insert payment table
                await query.insertTable('payment', {
                    order_id: stylish_orderDB_Result.insertId,
                    rec_trade_id: `"${tappayPostResultJSON.msg}"`,
                    prime: `"${req.body.prime}"`,
                });

                res.status(400).send({
                    status: tappayPostResultJSON.status,
                    msg: tappayPostResultJSON.msg,
                });

                cb();
            } else {
                // Insert order_item table
                await query.insertTable('order_items', {
                    order_id: stylish_orderDB_Result.insertId,
                    product_id: req.body.list[0].id,
                    product_color: `"${req.body.list[0].color.name}"`,
                    product_size: `"${req.body.list[0].size}"`,
                    product_value: req.body.list[0].qty,
                });

                // Insert payment table
                await query.insertTable('payment', {
                    order_id: stylish_orderDB_Result.insertId,
                    rec_trade_id: `"${tappayPostResultJSON.rec_trade_id}"`,
                    bank_transaction_id: `"${tappayPostResultJSON.bank_transaction_id}"`,
                    auth_code: `"${tappayPostResultJSON.auth_code}"`,
                    last_four: `"${tappayPostResultJSON.card_info.last_four}"`,
                    country: `"${tappayPostResultJSON.card_info.country}"`,
                    bin_code: `"${tappayPostResultJSON.card_info.bin_code}"`,
                    card_identifier: `"${tappayPostResultJSON.card_identifier}"`,
                    merchant_id: `"${tappayPostResultJSON.merchant_id}"`,
                    prime: `"${req.body.prime}"`,
                });

                // Update order pay status
                await query.updateTable('stylish_order', 'order_id', stylish_orderDB_Result.insertId, {
                    pay_yet: `"paid"`,
                });

                sendback.data.number = stylish_orderDB_Result.insertId;
                res.status(200).send(sendback);
            }
        });
    });
    tappayPostReq.write(JSON.stringify(tappayPostData));
    tappayPostReq.end();

});

module.exports = router;
