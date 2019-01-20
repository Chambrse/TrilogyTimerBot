var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
  console.log(req.headers);
  console.log(req.body);

  res.status(200).send({ "challenge": req.body.challenge });
});

router.post('/timer', function(req, res, next) {
  console.log(req.headers);
  console.log(req.body);
  setTimeout(() => {
    
    res.status(200).send({ "text": "in timeout function!" });
  }, 1000);
});

module.exports = router;
