var express = require('express');
var router  = express.Router();

router.get('/', function(req, res, next) {

  // do some logic here

  res.render('index', { title: 'node-express 学习' });
});

module.exports = router;
