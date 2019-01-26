// require('dotenv').config()
var express = require('express');
var router = express.Router();
let timer = require('../controllers/timer');
let slack = require('../controllers/messages');
let iGetIt = require('../controllers/iGetIt');
let trilogy_Message = require('../messages/trilogy_Message');

/* GET home page. */
router.post('/', function (req, res, next) {
  res.status(200).send({ "challenge": req.body.challenge });
});

//Slash Commands
router.post('/iGetIt', function (req, res, next) {
  console.log("igetit hit");
  iGetIt.reset();
  iGetIt.startPoll(req.body.channel_id, req, res);
});

router.post('/trilogy', function (req, res, next) {
  res.status(200).send(JSON.parse(trilogy_Message(null)));
});

router.post('/timer', function (req, res, next) {
  console.log(req.headers);
  console.log(req.body);

  const minutes = parseInt(req.body.text);
  const channel = req.body.channel_id;

  timer(channel, minutes);

  res.status(200).send({ "text": "Timer Started." });

});

// This endpoint is hit whenever a button is pressed or a menu item is selected
router.post('/actions', function (req, res, next) {
  console.log('action hit');
  let parsed = JSON.parse(req.body.payload);
  let actionName = parsed.actions[0].name;
  let actionValue = parsed.actions[0].value;
  let username = parsed.user.id;

  console.log(actionName);

  switch (actionName) {
    case "iGetIt":
      iGetIt.vote(actionValue, username, req, res);
      break;

    default:
        res.status(200);
      break;
  }

});

// For external options
router.post('/options', function (req, res, next) {
  console.log(req.body);
});

module.exports = router;
