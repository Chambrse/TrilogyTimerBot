var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).send({ "text": "got it" });
});

router.post('/timer', function(req, res, next) {
  res.status(200).send({ "text": "Timer Started" });
});

module.exports = router;
