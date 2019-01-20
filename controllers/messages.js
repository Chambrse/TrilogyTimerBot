var request = require('request');

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

module.exports = {
    sendMessage: sendMessage,
    sendUpdate: sendUpdate
}