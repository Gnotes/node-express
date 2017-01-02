var express = require('express');
var router  = express.Router();

router.get('/', function(req, res, next) {
  res.render('default', { title: '404 默认页面' });
});

module.exports = router;
