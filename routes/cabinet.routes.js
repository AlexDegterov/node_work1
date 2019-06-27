const express = require('express'),
  router = express.Router(),
  Profile = require('../models/profile.models');

router.get('/', function (req, res) {
  let msg = message(req.query.msg);
  Profile.findOne({
    where: { user_id: req.session.userId }
  }).then(data => {
    if (!data) {
      data = { "name": "", "surname": "", "town": "" }
    }
    res.render('cabinet', { data, msg });
  }).catch(err => { return res.sendErr(err); });
});

router.post('/', function (req, res) {
  const userParam = {
    user_id: req.session.userId,
    name: req.body.name,
    surname: req.body.surname,
    town: req.body.town
  }
  return saveUserProfile(userParam, res);
});

function saveUserProfile(userParam, res) {
  Profile.upsert(userParam).then(execute => {
    redirect(execute, res);
  }).catch(err => errorOperation(err, res));
}

function message(cod) {
  switch (cod) {
    case "saved":
      msg = 'Данные сохранены';
      break;
    case "update":
      msg = 'Данные обновлены';
      break;
    case "err":
      msg = 'Возникла ошибка сохранения данных';
      break;
    default:
      msg = "";
      break;
  }
  return msg;
}

function redirect(execute, res) {
  if (execute) return res.redirect('/cabinet?msg=saved&stamp=' + Date.now());
  return res.redirect('/cabinet?msg=update&stamp=' + Date.now());
}

function errorOperation(err, res) {
  console.log(err);
  res.redirect('/cabinet?msg=err&stamp=' + Date.now());
}

module.exports = router;