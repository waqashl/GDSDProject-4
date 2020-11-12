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
router.get('/ahmed', function(req, res, next) {
  res.sendFile('views/ahmed.html', { root: '.' });  
});

router.get('/bansi', function(req, res, next) {
  res.sendFile('views/bansi.html', { root: '.' });  
});
router.get('/waqas', function(req, res, next) {
  res.sendFile('views/waqas.html', { root: '.' });  
});
router.get('/Ziam', function(req, res, next) {
  res.sendFile('views/Ziam.html', { root: '.' });  
});

router.get('/bilal', function(req, res, next) {
  res.sendFile('views/bilal.html', { root: '.' });  
});
module.exports = router;
