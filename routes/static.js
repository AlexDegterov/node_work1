var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Контакты' });
});

router.get('/:url', function(req, res, next) {
  var url = req.params.url;
  res.render('index', { title: url });
});

module.exports = router;
