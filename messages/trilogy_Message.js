let trilogy_Message = function (options) {
    return JSON.stringify(
        {
            "text": "I am a test message",
            "attachments": [
                {
                    "text": "There are x minutes remaining in this activity.",
                    "title": "Timer"
                },
                {
                    "text": "menu",
                    "fallback": "my first menu",
                    "callback_id": "menu1",
                    "actions": [
                        {
                            "name": "mymenu",
                            "text": "This is a menu",
                            "type": "select",
                            "options": [
                                {
                                    "text": "option 1",
                                    "value": "some value"
                                },
                                {
                                    "text": "option 2",
                                    "value": "some value"
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    )};

    module.exports = trilogy_Message;