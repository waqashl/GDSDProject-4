var express = require('express');
var router = express.Router();
const path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });  
  
  //res.sendFile(path.join(__dirname+'/views/adnan.html'));

  //res.sendFile('../views/adnan.html');

  res.sendFile('views/adnan.html', { root: '.' });

  //res.sendFile(path.join(__dirname+'../views/adnan.html'));
});


router.get('/test', function(req, res, next) {
  //res.render('index', { title: 'Express' });  
  
  //res.sendFile(path.join(__dirname+'/views/adnan.html'));

  //res.sendFile('../views/adnan.html');

  res.sendFile('test.html', { root: __dirname });

  //res.sendFile(path.join(__dirname+'/views/adnan.html'));
});

module.exports = router;
