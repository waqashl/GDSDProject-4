const router = require('express').Router();
const { json } = require('body-parser');
const { stringify } = require('querystring');
const sqlManager = require('./sql');
const config = require('./config');
const jwt = require('jsonwebtoken');


// Register User
router.post('/register', function(req, res) {

    user = {
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        dob: req.body.dob,
        address: req.body.address,
        postalCode: req.body.postalCode
    }

    if(!user.email.endsWith('hs-fulda.de')) {
        res.status(400).json({message: "Only users with 'hs-fulda.de' email are authorized to register for application."});
        return
    }

    sqlManager.registerUser(user, function(err, result) {
        if (err) {
            res.status(500).json({status:'Failed', message: err.message});
            return
        }
        res.status(200).json({status:'Success', message:'User Added Succesfully'});
    });

});

router.post('/update/status',(req,res)=>{
    let id= req.body.id;
    let status = req.body.status;

    if(!(id && status)){
        res.status(400).json({message: "Email and password cannot be null."});
        return  
    }
    else{
        sqlManager.updateUserStatus(id,status,(err,result)=>{
            if(err){
                res.status(500).json({status:'Failed', message: err.message});
                return 
            }
            else{
                res.status(200).json({status:'Success', message:result});
  
            }
        })
    }
})


router.post('/login', function(req, res) {

    let email = req.body.email;
    let password = req.body.password;

    if (!(email && password)) {
        res.status(400).json({message: "Email and password cannot be null."});
        return
    }

    // get user from User Table...
    sqlManager.getUser(email, password, function(err, result) {
        if (err) {
            res.status(500).json({status:'Failed', message: err.message});
            return
        }
        
        if(result.length == 0) {
            res.status(200).json({status:'Failed', message:'Login Failed. Username or Password incorrect.'});
        }
        else {

            if (!result[0].isActive) {
                res.status(400).json({status:'Failed', message:'User is not authorized to login. Please contact system administrator.'});
                return
            }

            const token = jwt.sign({ user: result[0].id }, config.jwtSecret, { expiresIn: '1h' });
            res.status(200).json({status:'Success', message:'Login Success', token: token, user: result[0]});    
        }
    });

});

router.get('/all',(req,res)=>{
    sqlManager.getAllUser((err,rows)=>{
        if(err){
            res.status(500).json({status:'Failed', message: err.message});
            return 
        }

        if(rows.length == 0){
            res.status(200).json({status:'Failed', message:'No user found'});
        }
        else{
            res.status(200).json(rows);
        }
    })

})

module.exports = router