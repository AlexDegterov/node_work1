const express = require('express'),
  router = express.Router(),
  Profile = require('../models/profile.models'),
  path = require('path');

router.get('/', function (req, res) {
  let msg = message(req.query.msg),
    userId = req.session.userId;
  Profile.findOne({
    where: { user_id: userId }
  }).then(data => {
    if (!data) {
      data = { "name": "", "surname": "", "town": "", "picture": "" }
    }
    res.render('cabinet', { data, msg, userId });
  }).catch(err => { return res.sendErr(err); });
});

router.get('/delimage', function (req, res) {
  const userParam = {
    user_id: req.session.userId,
    picture: ''
  }
  saveUserProfile(userParam, res);
  return res.redirect('/cabinet');
});

router.post('/', function (req, res) {
  const userParam = {
    user_id: req.session.userId,
    name: req.body.name,
    surname: req.body.surname,
    town: req.body.town
  };
  if (req.files && req.files.picture) {
    let sentedPicture = req.files.picture,
      pictureName = Date.now() + "_" + sentedPicture.name,
      filePath = path.join(__dirname, '../uploads/', req.session.userId.toString(), '/', pictureName);
    userParam.picture = pictureName;
    saveFileToFolder(filePath, sentedPicture);
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

function saveFileToFolder(filePath, pic) {
  pic.mv(filePath, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    console.log('Файл загружен успешно');
  })
}
module.exports = router;