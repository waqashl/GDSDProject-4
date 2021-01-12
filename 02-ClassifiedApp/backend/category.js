const router = require('express').Router();
const { json } = require('body-parser');
const { stringify } = require('querystring');
const sqlManager = require('./sql');
const config = require('./config');
const jwt = require('jsonwebtoken');

router.post('/add', function(req, res) {
    let category = req.body.category;
    sqlManager.addCategory(category,(err,result)=>{
        if (err) {
            res.status(500).json({status:'Failed', message: err.message});
            return
        }
       
        res.status(200).json({status: 'Success', category: result});
    })
});

router.post('/delete', function(req, res) {
    let categoryId = req.body.categoryId;
    sqlManager.deleteCategory(categoryId,(err,result)=>{
        if (err) {
            res.status(500).json({status:'Failed', message: err.message});
            return
        }
       
        res.status(200).json({status: 'Success', category: result});
    })
});

router.get('/', function(req, res) {

    sqlManager.allCategories(req.query.id, function(err, result) {
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

router.get('/all', function(req, res) {

    sqlManager.getAllCategoriesForAdmin( function(err, result) {
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