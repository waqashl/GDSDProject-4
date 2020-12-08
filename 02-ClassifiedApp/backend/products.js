const router = require('express').Router();
const { json } = require('body-parser');
const { stringify } = require('querystring');
const sqlManager = require('./sql');
const config = require('./config');


router.post('/add', function(req, res) {

    res.status(200)
});

router.get('/', function(req, res) {

    id = req.query.id;

    if(id) {
        sqlManager.productDetails(id, function(err, result) {
            if (err) {
                res.status(500).json({status:'Failed', message: err.message});
                return
            }
            if(result.length == 0) {
                res.status(404).json({status: 'Success', message: 'Product not found.'});
                return
            }
            res.status(200).json({status: 'Success', products: result});
    
        });
    }
    else {
        sqlManager.searchProducts(req.query.sq, function(err, result) {
            if (err) {
                res.status(500).json({status:'Failed', message: err.message});
                return
            }
            if(result.length == 0) {
                res.status(404).json({status: 'Success', message: 'No Products Found.', products: []});
                return
            }
            res.status(200).json({status: 'Success', products: result});
        })    
    }

});

module.exports = router