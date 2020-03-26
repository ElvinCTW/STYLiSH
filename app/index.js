// Init
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({exetended: false}));
app.use(bodyParser.json());

// Pug
// Index
app.get('/', (req, res)=>{
    res.render('index');
});
// Checkout Page
app.get('/product.html', (req, res) => {
    res.render('product_checkout');
});
// Thankyou Page
app.get('/thankyou.html', (req, res) => {
    res.render('thankyou');
});
// Profile Page
app.get('/profile.html', (req, res) => {
    res.render('profile');
});
// User sign-in / sign-up Page
app.get('/user/sign.html', (req, res)=>{
    res.render('sign');
});
// Add Campaign Page
app.get('/admin/campaign.html', (req, res)=> {
    res.render('campaign');
});
// Add Product Page
app.get('/admin/product.html', (req, res)=> {
    res.render('addProduct');
});

// Statics
app.use('/public', express.static('public'));
app.use('/', express.static('public'));

// API Routes
// Product
// W0P3 Add Product Page route
const adminProductRoutes = require('./routes/addProductAPI');
app.use(adminProductRoutes);
// W1P1+2 Search products API route
const productsAPIRoutes = require('./routes/productsAPI');
app.use('/api/V1.0/products/', productsAPIRoutes);

// Campaign
// W1P3 Add Campaign Page route
const adminCampaignRoutes = require('./routes/addCampaignAPI');
app.use(adminCampaignRoutes);
// W1P3 Search products API route
const campaignAPIRoutes = require('./routes/marketAPI');
app.use('/api/V1.0/marketing/', campaignAPIRoutes);

// User
// W1P4 Add SignUP/SignIn API
const signAPIRoutes = require('./routes/userSignAPI');
app.use('/api/V1.0/user/', signAPIRoutes);

// Checkout
// W2P1,W2P2 Add checkout API
const checkoutAPIRoutes = require('./routes/checkoutAPI');
app.use('/api/V1.0/order/', checkoutAPIRoutes);

app.listen(3000, () => {
    console.log('yo we are in the aws server');
});
