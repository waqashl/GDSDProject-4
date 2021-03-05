const router = require('express').Router();
const { json } = require('body-parser');
const { stringify } = require('querystring');
const sqlManager = require('./sql');
const config = require('./config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);


// Register User
router.post('/register', function(req, res) {

    let textPass = req.body.password;
    let hashPass = bcrypt.hashSync(textPass, salt);
    console.log(hashPass);
    user = {
        email: req.body.email,
        password: hashPass,
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
    sqlManager.getUser(email, function(err, result) {
        if (err) {
            res.status(500).json({status:'Failed', message: err.message});
            return
        }
        
        if(result.length == 0) {
            res.status(200).json({status:'Failed', message:'Login Failed. Username or Password incorrect.'});
        }
        else {
            // $2b$10$3fDwhoSK2VHXh2a/XHQMD.ULh9TB7/wBAG5kP6ckuMTaekPGmsmXC new hash
            // $2b$10$uNPohQ6zqOOc4cPlVaUFWeee/pR3gVXqjtCSJv password hash

            bcrypt.compare(password, result[0].password).then((match) => {
                console.log("result after compare promise", match);
            })

            let match = bcrypt.compareSync(password, result[0].password);
            let hashPass = bcrypt.hashSync(password, salt);
            

            console.log(password, hashPass, result[0].password, match, bcrypt.compareSync(password, result[0].password));
            if(!match) {
                res.status(400).json({status:'Failed', message:'Incorrect Password.'});
                return
            }

            if (!result[0].isActive) {
                res.status(400).json({status:'Failed', message:'User is not authorized to login. Please contact system administrator.'});
                return
            }

            delete result[0].password;
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