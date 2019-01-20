// require('dotenv').config()
var express = require('express');
var router = express.Router();
var request = require('request');
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



router.post('/timer', function (req, res, next) {
  console.log(req.headers);
  console.log(req.body);
  res.status(200).send({ "text": "Timer Started." });

  sendMessage(req.body.channel, "Time Remaining", function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
  })

  let test = setTimeout(function () {
    console.log('the timeout is happening');
  }, 3000);

  // setTimeout(() => {

  //   res.status(200).send({ "text": "in timeout function!" });
  // }, 1000);
});

module.exports = router;
