var express = require('express');
var router = express.Router();
var Chatmessage = require('../models/chatmessage.models');

router.get('/', function(req, res, next) {
    Chatmessage.findAll({
    when: { }
  }).then(data => {
     //console.log(data[0]);
    res.render('baseMsg', { data: data } ); 
    }).catch(err => {
        res.json(err);
        console.log(err);
    })
});

module.exports = router;
