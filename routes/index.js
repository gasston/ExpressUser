var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/hello', function(req, res) {
  res.render('index ', { title: 'Hello World!!' });
});

/* GET home page. */
router.get('/hello/:name', function(req, res) {
  res.render('index', { title: 'Hello   :'+req.params.name });
});

module.exports = router;
