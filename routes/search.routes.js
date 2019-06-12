const express = require('express'),
  router = express.Router(),
  Maintext = require('../models/maintext.models'),
  Sequelize = require('sequelize'),
  Op = Sequelize.Op;

router.get('/', function (req, res, next) {
  var search = req.query.search;
  if (!search) return res.render('search', { title: 'Страница поиска' });
  Maintext.findAll({
    where: {
      [Op.or]: [
        {
          name: {
            [Op.like]: '%' + search + '%'
          }
        },
        {
          body: {
            [Op.like]: '%' + search + '%'
          }
        }
      ]
    }
  }).then(data => {
    res.render('searchResult', { data: data, search: search });
  }).catch(err => {
    res.json(err);
    console.log(err);
  })
});


module.exports = router;