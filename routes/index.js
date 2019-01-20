// require('dotenv').config()
var express = require('express');
var router = express.Router();
var request = require('request');
var moment = require('moment');
/* GET home page. */
router.post('/', function (req, res, next) {
  console.log(req.headers);
  console.log(req.body);

  res.status(200).send({ "challenge": req.body.challenge });
});

function sendMessage(channel, text, cb) {
  let body = JSON.stringify({
    'channel': channel,
    'text': text,
    'as_user': 'false',
    'username': 'Trilogy_Timer'
  });

  var options = {
    url: 'https://slack.com/api/chat.postMessage',
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.SLACK_TOKEN}`
    },
    body: body
  };

  request.post(options, cb);
}

function sendUpdate(channel, text, timestamp, cb) {
  let body = JSON.stringify({
    'channel': channel,
    'text': text,
    'as_user': 'false',
    'username': 'Trilogy_Timer',
    'ts': timestamp
  });

  var options = {
    url: 'https://slack.com/api/chat.update',
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.SLACK_TOKEN}`
    },
    body: body
  };

  request.post(options, cb);
}



router.post('/timer', function (req, res, next) {
  console.log(req.headers);
  console.log(req.body);
  
  let timerMessageTimeStamp = null;
  const minutes = parseInt(req.body.text);
  const timerEnd = moment().add(minutes, 'minutes');
  const channel = req.body.channel_id;
  
  sendMessage(channel, `There are ${moment(timerEnd.diff(moment())).format("hh:mm:ss")} remaining.`, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
    
    console.log(JSON.parse(body, null ,2).ts);
    timerMessageTimeStamp = JSON.parse(body, null ,2).ts;
    
  });
  res.status(200).send({ "text": "Timer Started." });

  let timerInterval = setInterval(() => {
    sendUpdate(channel, `There are ${moment(timerEnd.diff(moment())).format("hh:mm:ss")} remaining`, timerMessageTimeStamp, function (error, response, body) {
      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      console.log('body:', body); // Print the HTML for the Google homepage.  
    });
  }, 1000)

});

module.exports = router;
