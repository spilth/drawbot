'use strict';

var DrawBot = require('../lib/drawbot');

var token = process.env.BOT_API_KEY;
var name = process.env.BOT_NAME;

var drawbot = new DrawBot({
    token: token,
    name: name
});

drawbot.run();
