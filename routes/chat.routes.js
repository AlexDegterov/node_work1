var express = require('express');
var cors = require('cors');
var router = express.Router();
var Chatmessage = require('../models/chatmessage.models');

router.get('/', cors(), function(req, res, next) {
    if(req.query.Name && req.query.Room) {
        res.render('chat', { name: req.query.Name, room: req.query.Room });
    } else {
        res.render('chatEnter');
    }    
});

router.post('/', cors(), function(req, res, next) {
    const obj = new Chatmessage(req.body);
    obj.save().then( data => {
        
    }).catch(err => {
        throw new Error("Ошибка при сохранении сообщения из чата в БД");
    });
});

module.exports = router;
