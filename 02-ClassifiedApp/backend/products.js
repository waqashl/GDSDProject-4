const router = require('express').Router();
const { json } = require('body-parser');
const { stringify } = require('querystring');
const sqlManager = require('./sql');
const config = require('./config');
const multer  = require('multer');
const { route } = require('./user');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  });
const upload = multer({storage: storage});
  

router.get('/', function(req, res) {

    id = req.query.id;

    if(id) {
        sqlManager.productDetails(id, '1', function(err, result, images) {
            if (err) {
                res.status(500).json({status:'Failed', message: err.message});
                return
            }
            if(result.length == 0) {
                res.status(404).json({status: 'Success', message: 'Product not found.'});
                return
            }
            res.status(200).json({status: 'Success', products: result, productImages:images});
        });
    }
    else {
        sqlManager.searchProducts(req.query.sq, req.query.cat, req.query.pMin, req.query.pMax, req.query.sortT, req.query.sortV , function(err, result) {
            if (err) {
                res.status(500).json({status:'Failed', message: err.message});
                return
            }
            if(result.length == 0) {
                res.status(200).json({status: 'Success', message: 'No Products Found.', products: []});
                return
            }
            res.status(200).json({status: 'Success', products: result});
        })    
    }

});


router.get('/all', function(req, res) {

  
        sqlManager.getAllProducts("",function(err, result) {
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

});

router.post('/update/status',(req,res)=>{
let id = req.body.id;
let status = req.body.status;

const update= sqlManager.updateProductStatus(id,status,(uErr,uRes)=>{
    console.log(uRes,uErr);
    if(uErr){
        res.status(404).send(uErr);
    }
    res.status(200).send(uRes);
})
})

router.post('/',upload.array('images',10), function(req, res) {

    var thumbnail = "https://www.froben11.de/wp-content/uploads/2016/10/orionthemes-placeholder-image.png";

    if(req.files && req.files.length > 0) {
        thumbnail = req.files[0].path;
    }

    let p = { 
        title: req.body.title,
        owner: parseInt(req.body.owner),
        category: parseInt(req.body.category),
        price: parseInt(req.body.price),
        location: req.body.location.toString(),
        thumbnail: thumbnail
    };

    if(req.body.desc) {
        p.desc = req.body.desc;
    }

    const owner = sqlManager.getUserofId(p.owner, (uErr, uRes) => {

        if (uErr) {
            res.status(500).json({status:'Failed', message: uErr.message});
            return;
        }
        if(uRes.length == 0) {
            res.status(404).json({status: 'Failed', message: 'User not available.'});
            return;
        }
        if(!uRes[0].isActive) {
            res.status(400).json({status: 'Failed', message: 'User not allowed to add product.'});
            return;
        }
        const cat = sqlManager.allCategories(p.category, (catErr, catRes) => {
            if (catErr) {
                res.status(500).json({status:'Failed', message: catErr.message});
                return;
            }
            if(catRes.length == 0) {
                res.status(404).json({status: 'Failed', message: 'Category not available.'});
                return;
            }
            if(!catRes[0].isActive) {
                res.status(400).json({status: 'Failed', message: 'Invalid Category.'});
                return;
            }
    
            sqlManager.addProduct(p, (pErr, pRes) => {
                console.log(pErr,pRes);
                if (pErr) {
                    res.status(500).json({status:'Failed', message: pErr.message});
                    return;
                }
                if(pRes.length == 0) {
                    res.status(404).json({status: 'Failed', message: 'Cannot add product.'});
                    return;
                }
                let files = req.files.map((f)=> {return f.path;});
                if(files.length > 0) {
                    sqlManager.addProductImage(pRes.insertId, files, (imageErr, imageRes) => {
                        if(imageErr) {
                            console.log(imageErr);
                            res.status(500).json({status: "Failed", message: imageErr.message});
                            return
                        }
                        res.status(200).json({ status: "Success", message: "Product will be available soon after approval from admin"});
                    });
                }
                else {
                    res.status(200).json({ status: "Success", message: "Product will be available soon after approval from admin"});

                }
            });
    
        });
    });


});

module.exports = router