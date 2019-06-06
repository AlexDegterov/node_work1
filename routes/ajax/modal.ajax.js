var express = require('express');
var router = express.Router();
var Chatmessage = require('../../models/chatmessage.models');

router.post('/modal', function(req, res, next) {
    var idMsg = req.body.id;
    
    Chatmessage.findOne({
        where: {id: +idMsg}
      }).then(data => {
        res.write('<h2>Пользователь ' + data.name +'</h2>');
        res.write('<div>комната: ' + data.room +'</div>');
        res.write('<div>сообщение: ' + data.message +'</div>');
        res.end();
      }).catch(err => {
        res.json(err);
       // console.log(err);
      })

    // console.log("Get id - " + idMsg);

});

module.exports = router;
