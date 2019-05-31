var express = require('express');
var router = express.Router();
var Maintext = require('../models/maintext.models');

/* GET home page. */

router.get('/all', function(req, res, next) {
  Maintext.findAll({}).then(data => {
    res.json(data)
  })
}); 

router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Контакты' });
});

router.post('/add', function(req, res, next) {
  //console.log(req.body);
  const obj = new Maintext(req.body);
  //console.log(obj);
  obj.save().then( data => {
   // console.log(req.body);
    //console.log(data);
    //res.json(data);
  }).catch(err);
  console.log("Сохранено");
  res.send("Сохранено");
});

router.post('/update/:id', function(req, res, next) {
  console.log();
  Maintext.update({
    name: req.body.name,
    body: req.body.body,
    url: req.body.url
  }, {
    where: {id: req.params.id}
  }).catch(err);
  console.log("Сохранено");
});

router.get('/delete/:id', function(req, res, next) {
  console.log();
  Maintext.destroy({
    where: {id: req.params.id}
  }).catch(err);
  console.log("Сохранено");
});


router.get('/:url', function(req, res, next) {
  var url = req.params.url;
  Maintext.findOne({
    when: {url: url}
  }).then(data => {
    res.render('static', { data: data } ); //{ title: url }
  }).catch(err => {
    res.json(err);
    console.log(err);
  })
});



router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
