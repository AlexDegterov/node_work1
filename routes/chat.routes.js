var express = require('express');
var router = express.Router();
var Chatmessage = require('../models/chatmessage.models');

router.get('/', function(req, res, next) {
    res.render('chat');
});

router.post('/', function(req, res, next) {
    const obj = new Chatmessage(req.body);
    obj.save().then( data => {
        
    }).catch(err);
});

module.exports = router;
