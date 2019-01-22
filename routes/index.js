// require('dotenv').config()
var express = require('express');
var router = express.Router();
let timer = require('../controllers/timer');
let slack = require('../controllers/messages');

/* GET home page. */
router.post('/', function (req, res, next) {
  console.log(req.headers);
  console.log(JSON.stringify(req.body, null, 2));

  res.status(200).send({ "challenge": req.body.challenge });
});

router.post('/iGetIt', function (req, res, next) {
  console.log(req.headers);
  console.log(req.body);


  let body = JSON.stringify({
    'channel': req.body.channel_id,
    'as_user': 'false',
    'username': 'Trilogy_Timer',
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

  });
  res.status(200).send();

});

let responses = [0,0];

router.post('/actions', function (req, res, next) {
  console.log(req.headers);
  console.log(JSON.stringify(req.body, null, 2));

  let action = "I Get It";
  console.log("action", action);
  switch (action) {
    case "I Get It":
    console.log("inside i get it");
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

  // res.status(200).send({
  //   'channel': req.body.channel_id,
  //   'as_user': 'false',
  //   'username': 'Trilogy_Timer',
  //   "text": "Please rate your comprehension of this topic.",
  //   "attachments": [{
  //     "text": "someone responded to thise message."
  //   },
  //   {
  //     "fallback": "Something Happened.",
  //     "callback_id": "ComprehensionRating",
  //     "color": "#3AA3E3",
  //     "attachment_type": "default",
  //     "actions": [
  //       {
  //         "name": "I Get It",
  //         "text": "I get it!",
  //         "type": "button",
  //         "value": "iGetIt"
  //       },
  //       {
  //         "name": "I Don't Get It",
  //         "text": "What?",
  //         "type": "button",
  //         "value": "iDontGetIt"
  //       }
  //     ]
  //   }
  //   ]
  // });
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
