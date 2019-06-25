const express = require('express'),
  router = express.Router(),
  Profile = require('../models/profile.models'),
  Sequelize = require('sequelize'),
  Op = Sequelize.Op;

router.get('/', function (req, res, next) {
  var url = req.params.url;
  var msg = '';
  if(req.query.saved) msg = 'Данные сохранены';
  Profile.findOne({
    where: { user_id: req.session.userId }
  }).then(data => {
    if(!data) {
      data = { "name": "", "surname": "", "town": "" }
    }
    res.render('cabinet', { data: data, msg: msg } );  
  }).catch(err => {
    res.json(err);
  })
});

router.post('/', function (req, res, next) {
  Profile.findOne({
    where: { user_id: req.session.userId }
  }).then(data => {
    if(data) {
      Profile.update({
        name: req.body.name,
        surname: req.body.surname,
        town: req.body.town
      }, {
        where: { user_id: req.session.userId }
      }) 
      return res.redirect('/cabinet?saved=yes&stamp=' + Date.now());
    }

    const userParam = {
      user_id: req.session.userId,
      name: req.body.name,
      surname: req.body.surname,
      town: req.body.town
    }
    const obj = new Profile (userParam);
    obj.save().then( data => {
      }).catch(err => console.log(err));
    res.redirect('/cabinet?saved=yes&stamp=' + Date.now());
  }).catch(err => {
    res.json(err);
  })
});  


module.exports = router;