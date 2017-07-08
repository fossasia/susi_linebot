'use strict';

const line = require('@line/bot-sdk');
const express = require('express');
var request = require('request');
var http = require('http');

// create LINE SDK config from env variables
const config = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET,
};

setInterval(function() {
    http.get('https://susi-slackbot.herokuapp.com/');
}, 1200000);


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
        var type = (JSON.parse(body1)).answers[0].actions;
        var ans = (JSON.parse(body1)).answers[0].actions[0].expression;
        // create a echoing text message
        if (type.length == 1 && type[0].type == "answer") {
            const answer = {
                type: 'text',
                text: ans
            };
            // use reply API
            return client.replyMessage(event.replyToken, answer);
        } else if (type.length == 3 && type[2].type == "map") {
            var lat = type[2].latitude;
            var lon = type[2].longitude;
            var address = JSON.parse(body1).answers[0].data[0].place

            const answer1 = [{
                    type: 'text',
                    text: ans
                },
                {
                    "type": "location",
                    "title": "Location",
                    "address": address,
                    "latitude": lat,
                    "longitude": lon
                }
            ]

            // use reply API
            return client.replyMessage(event.replyToken, answer1);

        } else if (type.length == 1 && type[0].type == "table") {
            var data = JSON.parse(body1).answers[0].data;
            var columns = type[0].columns;
            var key = Object.keys(columns);
            var msg = [];
            console.log(key);

            for (var i = 0; i < 5; i++) {
                msg[i] = "";
                msg[i] = {
                    type: 'text',
                    text: key[0].toUpperCase() + ": " + data[i][key[0]] + "\n" + key[1].toUpperCase() + ": " + data[i][key[1]] + "\n" + key[2].toUpperCase() + ": " + data[i][key[2]]
                }
            }
            return client.replyMessage(event.replyToken, msg);
        }

    })


}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});
