// require('dotenv').config()
var express = require('express');
var router = express.Router();
let timer = require('../controllers/timer');
let slack = require('../controllers/messages');
let iGetIt = require('../controllers/iGetIt');

/* GET home page. */
router.post('/', function (req, res, next) {
  res.status(200).send({ "challenge": req.body.challenge });
});


router.post('/iGetIt', function (req, res, next) {
console.log("igetit hit");
  iGetIt.reset();
  iGetIt.startPoll(req.body.channel_id);

});


router.post('/actions', function (req, res, next) {
  console.log('action hit');
  let parsed = JSON.parse(req.body.payload);
  let actionName = parsed.actions[0].name;
  let actionValue = parsed.actions[0].value;
  let username = parsed.user.id;

  switch (actionName) {
    case "iGetIt":
        iGetIt.vote(actionValue, username);
      break;
  
    default:
      break;
  }

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
