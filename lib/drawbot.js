'use strict';

var util = require('util');
var Bot = require('slackbots');

var DrawBot = function Constructor(settings) {
    this.settings = settings;
    this.settings.name = this.settings.name || 'drawbot';
};

DrawBot.prototype.run = function () {
    DrawBot.super_.call(this, this.settings);

    this.on('start', this._onStart);
    this.on('message', this._onMessage);
};

DrawBot.prototype._getChannelById = function (channelId) {
    console.log("channelId: " + channelId);
    return this.channels.filter(function (item) {
        return item.id === channelId;
    })[0];
};


DrawBot.prototype._loadBotUser = function () {
    var self = this;
    this.user = this.users.filter(function (user) {
        return user.name === self.name;
    })[0];
};

DrawBot.prototype._onStart = function () {
    console.log("Started!");
    this._loadBotUser();
};

DrawBot.prototype._onMessage = function (message) {
    if (message.type === "presence_change") {
        return;
    }

    console.log("#####");
    console.log(message);

    var isChatMessage = this._isChatMessage(message);
    var isChannelConversation = this._isChannelConversation(message);
    var isFromDrawBot = this._isFromDrawBot(message);

    console.log("Survay says: "+ isChatMessage + isChannelConversation + isFromDrawBot);

    if (isChatMessage && isChannelConversation && !isFromDrawBot) {
        this._sayDraw(message);
    }
};

DrawBot.prototype._isChatMessage = function (message) {
    console.log("message.text: " + message.text)
    return message.type === 'message' && Boolean(message.text);
};

DrawBot.prototype._isChannelConversation = function (message) {
    console.log("messsage.channel: " + message.channel);
    return typeof message.channel === 'string' && message.channel[0] === 'G';
};

DrawBot.prototype._isFromDrawBot = function (message) {
    console.log("# isFromDrawBot");
    console.log("this.user.id: " + this.user.id);
    return message.user === this.user.id;
};

DrawBot.prototype._sayDraw = function (message) {
    console.log("###");
    console.log("Say draw");
    var self = this;
    var channel = self._getChannelById(message.channel);
    console.log("channel: " + channel);
    self.postMessageToChannel(channel.name, "Draw!", {as_user: true});
};

util.inherits(DrawBot, Bot);

module.exports = DrawBot;
