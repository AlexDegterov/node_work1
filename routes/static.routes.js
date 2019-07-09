var express = require('express');
var router = express.Router();
var Maintext = require('../models/maintext.models');

router.get('/all', function(req, res, next) {
  Maintext.findAll({}).then(data => {
    res.json(data)
  })
  next();
}); 

router.get('/contact', function(req, res) {
  res.render('contact', { title: 'Контакты' });
});

router.post('/add', function(req, res) {
  const obj = new Maintext(req.body);
  obj.save().then( data => {
  }).catch(err);
  console.log("Добавлено");
  res.send("Добавлено");
});

router.post('/update/:id', function(req, res) {
  console.log();
  Maintext.update({
    name: req.body.name,
    body: req.body.body,
    url: req.body.url
  }, {
    where: {id: req.params.id}
  }).catch(err);
  console.log("Обновлено");
  res.send("Обновлено");
});

router.get('/delete/:id', function(req, res) {
  Maintext.destroy({
    where: {id: req.params.id}
  }).catch(err);
  console.log("Удалено");
  res.send("Удалено");
});

router.get('/:url', function(req, res) {
  var url = req.params.url;
  Maintext.findOne({
    where: {url: url}
  }).then(data => {
    res.render('static', { data: data } ); 
  }).catch(err => {
    res.json(err);
    console.log(err);
  })
});

router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
