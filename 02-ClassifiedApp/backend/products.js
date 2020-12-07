const router = require('express').Router();
const { json } = require('body-parser');
const { stringify } = require('querystring');
const sqlManager = require('./sql');
const config = require('./config');



router.get('/products', function(req, res) {

    
});