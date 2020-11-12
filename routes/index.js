var express = require('express');
var router = express.Router();
const path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });  
  
  //res.sendFile(path.join(__dirname+'/views/adnan.html'));

  //res.sendFile('../views/adnan.html');

  res.sendFile('views/main.html', { root: '.' });

  //res.sendFile(path.join(__dirname+'../views/adnan.html'));
});

router.get('/adnan', function(req, res, next) {
   res.sendFile('views/adnan.html', { root: '.' });  
});

router.get('/bansi', function(req, res, next) {
  res.sendFile('views/bansi.html', { root: '.' });  
});

module.exports = router;
