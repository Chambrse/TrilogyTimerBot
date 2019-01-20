// require('dotenv').config()
var express = require('express');
var router = express.Router();
let timer = require('../controllers/timer');

/* GET home page. */
router.post('/', function (req, res, next) {
  console.log(req.headers);
  console.log(req.body);

  res.status(200).send({ "challenge": req.body.challenge });
});

router.post('/timer', function (req, res, next) {
  console.log(req.headers);
  console.log(req.body);
  
  const minutes = parseInt(req.body.text);
  const channel = req.body.channel_id;

  timer(channel, minutes);

  res.status(200).send({ "text": "Timer Started." });

  
});

module.exports = router;
