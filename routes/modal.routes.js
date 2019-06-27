var express = require('express');
var router = express.Router();
var Chatmessage = require('../models/chatmessage.models');

router.get('/', function(req, res) {
    Chatmessage.findAll({
    where: { }
  }).then(data => {
    res.render('modal', { data: data } ); 
    }).catch(err => {
        res.json(err);
        console.log(err);
    })
});

module.exports = router;
