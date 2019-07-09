const express = require('express'),
  router = express.Router(),
  User = require('../models/auth.models'),
  Sequelize = require('sequelize'),
  Op = Sequelize.Op;

router.post('/register', (req, res) => {
  const userParam = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    putdate: new Date(),
    lastvisit: new Date()
  }

  const obj = new User(userParam);
  obj.save().then(data => { }).catch(err => console.log(err));
  console.log("Сохранен пользователь: " + userParam);
  return res.redirect('/auth/login');
});

router.get('/register', (req, res) => {
  res.render('register', { title: 'Регистрация' });
});

router.get('/login', (req, res) => {
  res.render('login', { title: 'Вход на сайт' });
});

router.post('/login', function (req, res) {
  const userParam = {
    email: req.body.email,
    password: req.body.password,
  }

  User.findOne({
    where: {
      [Op.and]: [
        {
          email: userParam.email
        },
        {
          password: userParam.password
        }
      ]
    }
  }).then(data => {
    if (data) {
      req.session.userId = data.id;
      return res.redirect("/");
    }
    return res.render('login', { title: 'Вход на сайт', err: 'Нет такого пользователя. Проверьте вводимые данные' });
  }).catch(err => {
    res.json(err);
    console.log(err);
  })
});

router.get('/logout', function (req, res, next) {
  req.session.destroy();
  res.redirect("/");
  next();
});

module.exports = router;