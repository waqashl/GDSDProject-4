const router = require('express').Router();
const { json } = require('body-parser');
const { stringify } = require('querystring');
const sqlManager = require('./sql');
const config = require('./config');
const jwt = require('jsonwebtoken');

router.post('/add', function(req, res) {

});

router.get('/', function(req, res) {

    sqlManager.allCategories(function(err, result) {
        if (err) {
            res.status(500).json({status:'Failed', message: err.message});
            return
        }
        if(result.length == 0) {
            res.status(404).json({status: 'Success', message: 'No Categories Found.', categories: []});
            return
        }
        res.status(200).json({status: 'Success', categories: result});
    })    

});

module.exports = router