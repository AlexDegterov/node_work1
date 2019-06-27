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

  Profile.findOne({
    where: { user_id: userParam.user_id }
  }).then(data => {
    if (data) {
      return saveProfile(userParam, res);
    }
    return updateProfile(userParam, res);
  });
});

function message(cod) {
  switch (cod) {
    case "saved":
      msg = 'Данные сохранены';
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

function saveProfile(userParam, res) {
  Profile.update(userParam, {
    where: { user_id: userParam.user_id }
  }).then(execute => {
    redirect(execute, res);
  }).catch(err => errorOperation(err, res));
}

function updateProfile(userParam, res) {
  const obj = new Profile(userParam);
  obj.save().then(execute => {
    redirect(execute, res);
  }).catch(err => errorOperation(err, res));
}

function redirect(execute, res) {
  if (execute) return res.redirect('/cabinet?msg=saved&stamp=' + Date.now());
  return res.redirect('/cabinet?msg=err&stamp=' + Date.now());
}

function errorOperation(err, res) {
  console.log(err);
  res.redirect('/cabinet?msg=err&stamp=' + Date.now());
}

module.exports = router;