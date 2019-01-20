var moment = require('moment');
var slack = require('./messages');

function startTimer(channel, minutes) {
    let timerMessageTimeStamp = null;
    const timerEnd = moment().add(minutes, 'minutes');

    let initialDuration = moment.duration(timerEnd.diff(moment()));

    slack.sendMessage(channel, `${initialDuration.minutes()}:${initialDuration.seconds()} remaining.`, function (error, response, body) {
        console.log('body:', body); // Print the HTML for the Google homepage.

        console.log(JSON.parse(body, null, 2).ts);
        timerMessageTimeStamp = JSON.parse(body, null, 2).ts;

    });

    let timerInterval = setInterval(() => {
        console.log(timerEnd.diff(moment()));
        let currentDuration = moment.duration(timerEnd.diff(moment()));
        slack.sendUpdate(channel, `${currentDuration.minutes()}:${currentDuration.seconds()} remaining.`, timerMessageTimeStamp, function (error, response, body) {
            console.log('body:', body); // Print the HTML for the Google homepage.  
        });
    }, 5000);

    setTimeout(() => {
        clearInterval(timerInterval);
    }, 20000);
}

module.exports = startTimer;