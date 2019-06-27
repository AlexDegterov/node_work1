const express = require('express'),
  router = express.Router();

  router.get('/', function (req, res) {
   
    res.render('dragNdrop');
  });



module.exports = router;