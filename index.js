'use strict';

const line = require('@line/bot-sdk');
const express = require('express');
var request = require("request");

// create LINE SDK config from env variables
const config = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET,
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/webhook', line.middleware(config), (req, res) => {
    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result));
});

// event handler
function handleEvent(event) {
    if (event.type !== 'message' || event.message.type !== 'text') {
        // ignore non-text-message event
        return Promise.resolve(null);
    }

    var options1 = {
        method: 'GET',
        url: 'http://api.asksusi.com/susi/chat.json',
        qs: {
            timezoneOffset: '-330',
            q: event.message.text
        }
    };

    request(options1, function(error1, response1, body1) {
        if (error1) throw new Error(error1);
        // answer fetched from susi
        //console.log(body1);
        var ans = (JSON.parse(body1)).answers[0].actions[0].expression;
        // create a echoing text message
        const answer = {
            type: 'text',
            text: ans
        };

        // use reply API
        return client.replyMessage(event.replyToken, answer);

    })


}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});