var express = require('express');
var cors = require('cors');
var router = express.Router();
var Chatmessage = require('../models/chatmessage.models');

router.get('/', cors(), function(req, res, next) {
    Chatmessage.findAll({
    when: {"name": "Alexdeg"}
  }).then(data => {
     console.log(data[0]);
    res.render('baseMsg', { data: data } ); 
    }).catch(err => {
        res.json(err);
        console.log(err);
    })
    // res.render('baseMsg');
});

module.exports = router;
