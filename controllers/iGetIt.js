let iGetIt_Message = require('../messages/iGetIt_Message');
let slack = require('../controllers/messages');

const iGetIt = {
    responses: [0, 0],
    usersResponded: [],
    pollId: null,
    channel: null,

    reset: function () {
        this.responses = [0, 0];
        this.usersResponded = [];
        this.pollId = null;
        this.channel = null;
    },

    startPoll: function (channel) {
        this.channel = channel;
        slack.sendMessage(iGetIt_Message(this.channel, [0, 0]), function (error, response, body) {
            this.pollId = JSON.parse(body, null, 2).ts;
        });
    },

    vote: function (action, userId) {

        switch (action) {
            case 'I Get It!':
            this.responses[0]++;
                break;
            case 'I Don\'t Get It!':
            this.responses[1]++;
                break;

            default:
                break;
        }

        
        if (!this.usersResponded.includes(userId)) {
            res.status(200).send(iGetIt_Message(this.channel, this.responses));
            // slack.sendMessage(iGetIt_Message(this.channel, this.responses), function (error, response, body) {
            //     this.pollId = JSON.parse(body, null, 2).ts;
            // });
        } else {
            res.status(200);
        }


        this.usersResponded.push(userId);
    }


}

module.exports = iGetIt;