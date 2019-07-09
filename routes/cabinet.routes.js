const express = require('express'),
  router = express.Router(),
  Profile = require('../models/profile.models'),
  path = require('path'),
  fs = require('fs');

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
  var pictureName = '';
  if (req.files && req.files.picture) {
    var pic = req.files.picture,
      pictureName = Date.now() + "_" + pic.name,
      folderName = path.join(__dirname, '../uploads/', req.session.userId.toString(), '/'),
      filePath = path.join(folderName, pictureName);
    makeFolder(folderName);
    upploadFile(filePath, pic);
  }
  const userParam = {
    user_id: req.session.userId,
    name: req.body.name,
    surname: req.body.surname,
    town: req.body.town
  }
  if(pictureName !== '') {
     userParam.picture = pictureName ;
  };   
  console.log(userParam);
  
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

function makeFolder(folderName) {
  try {
    if (!fs.existsSync(folderName)){
      fs.mkdirSync(folderName)
    }
  } catch (err) {
    console.error(err)
  }
}

function upploadFile(filePath, pic) {
  pic.mv(filePath, (err) => {
    if(err) {
      console.log(err);
    } else {
      console.log('Файл загружен успешно');
    }
  })
}
module.exports = router;