let iGetIt_Message = function (channel, responses) {
    return JSON.stringify({
        'channel': channel,
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
                        "name": "iGetIt",
                        "text": `I Get It! ${responses != null ? responses[0] : ""}`,
                        "type": "button",
                        "value": "I Get It!"
                    },
                    {
                        "name": "iGetIt",
                        "text": `What? ${responses != null ? responses[1] : ""}`,
                        "type": "button",
                        "value": "I Don't Get It!"
                    }
                ]
            }
        ]
    });
};

module.exports = iGetIt_Message;
