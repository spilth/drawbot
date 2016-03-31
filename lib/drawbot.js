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
    this._loadBotUser();
};

DrawBot.prototype._onMessage = function (message) {
    if (this._isChatMessage(message) && this._isChannelConversation(message) && !this._isFromDrawBot(message)) {
        this._sayDraw(message);
    }
};

DrawBot.prototype._isChatMessage = function (message) {
    return message.type === 'message' && Boolean(message.text);
};

DrawBot.prototype._isChannelConversation = function (message) {
    return typeof message.channel === 'string' && message.channel[0] === 'C';
};

DrawBot.prototype._isFromDrawBot = function (message) {
    return message.user === this.user.id;
};

DrawBot.prototype._sayDraw = function (message) {
    var self = this;
    var channel = self._getChannelById(message.channel);
    self.postMessageToChannel(
        channel.name,
        "Draw something! I don't have any ideas yet, though... except maybe a new avatar image?",
        {as_user: true}
    );
};

util.inherits(DrawBot, Bot);

module.exports = DrawBot;
