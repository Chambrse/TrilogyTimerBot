// require('dotenv').config()
var express = require('express');
var router = express.Router();
let timer = require('../controllers/timer');
let slack = require('../controllers/messages');

/* GET home page. */
router.post('/', function (req, res, next) {
  res.status(200).send({ "challenge": req.body.challenge });
});

let responses = [0, 0];
let usersResponded = [];
let currentPollId;
router.post('/iGetIt', function (req, res, next) {

  responses = [0, 0];
  usersResponded = [];

  let body = JSON.stringify({
    'channel': req.body.channel_id,
    'as_user': 'false',
    'username': 'Trilogy',
    "text": "Please rate your comprehension of this topic.",
    "attachments": [
      {
        "fallback": "Something Happened.",
        "callback_id": "ComprehensionRating",
        "color": "#3AA3E3",
        "attachment_type": "default",
        "actions": [
          {
            "name": "I Get It",
            "text": "I get it!",
            "type": "button",
            "value": "iGetIt"
          },
          {
            "name": "I Don't Get It",
            "text": "What?",
            "type": "button",
            "value": "iDontGetIt"
          }
        ]
      }
    ]
  });

  slack.sendMessageNew(body, function (error, response, body) {
    console.log('body:', body); // Print the HTML for the Google homepage.

    console.log(JSON.parse(body, null, 2).ts);
    currentPollId = JSON.parse(body, null, 2).ts;

  });

  res.status(200).send();

});


router.post('/actions', function (req, res, next) {
  let parsed = JSON.parse(req.body.payload);
  let action = parsed.actions[0].name;
  let username = parsed.user.id;

  if (!usersResponded.includes(username)) {
    switch (action) {
      case "I Get It":
        responses[0]++;
        res.status(200).send({
          "text": "Please rate your comprehension of this topic.",
          "attachments": [
            {
              "fallback": "Something Happened.",
              "callback_id": "ComprehensionRating",
              "color": "#3AA3E3",
              "attachment_type": "default",
              "actions": [
                {
                  "name": "I Get It",
                  "text": `I get it! (${responses[0]})`,
                  "type": "button",
                  "value": "iGetIt"
                },
                {
                  "name": "I Don't Get It",
                  "text": `What? (${responses[1]})`,
                  "type": "button",
                  "value": "iDontGetIt"
                }
              ]
            }
          ]
        });
        break;
      case "I Don\'t Get It":
        responses[1]++;
        res.status(200).send({
          "text": "Please rate your comprehension of this topic.",
          "attachments": [
            {
              "fallback": "Something Happened.",
              "callback_id": "ComprehensionRating",
              "color": "#3AA3E3",
              "attachment_type": "default",
              "actions": [
                {
                  "name": "I Get It",
                  "text": `I get it! (${responses[0]})`,
                  "type": "button",
                  "value": "iGetIt"
                },
                {
                  "name": "I Don't Get It",
                  "text": `What? (${responses[1]})`,
                  "type": "button",
                  "value": "iDontGetIt"
                }
              ]
            }
          ]
        });
        break;

      default:
        break;
    }
  } else {
    res.status(200).send({
      "text": "Please rate your comprehension of this topic.",
      "attachments": [
        {
          "fallback": "Something Happened.",
          "callback_id": "ComprehensionRating",
          "color": "#3AA3E3",
          "attachment_type": "default",
          "actions": [
            {
              "name": "I Get It",
              "text": `I get it! (${responses[0]})`,
              "type": "button",
              "value": "iGetIt"
            },
            {
              "name": "I Don't Get It",
              "text": `What? (${responses[1]})`,
              "type": "button",
              "value": "iDontGetIt"
            }
          ]
        }
      ]
    });
  }

  usersResponded.push(username);

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
