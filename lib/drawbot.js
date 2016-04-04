"use strict";

var util = require('util');
var slackbots = require('slackbots');
var faker = require('faker');

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
    return this.channels.filter(function (item) {
        return item.id === channelId;
    })[0];
};

DrawBot.prototype._onStart = function () {
    this._loadBotUser();
};

DrawBot.prototype._loadBotUser = function () {
    var self = this;

    this.user = this.users.filter(function (user) {
        return user.name === self.name;
    })[0];

    console.log("User: " + this.user);
};

DrawBot.prototype._onMessage = function (message) {
    if (this._isChatMessage(message) &&
        this._isChannelConversation(message) &&
        this._isDrawBotCommand(message) &&
        this._isRequestingDrawingTopic(message) &&
        !this._isFromDrawBot(message)) {
        this._suggestTopic(message);
    }
};

DrawBot.prototype._isChatMessage = function (message) {
    return message.type === 'message' && Boolean(message.text);
};

DrawBot.prototype._isChannelConversation = function (message) {
    return typeof message.channel === 'string' && message.channel[0] === 'C';
};

DrawBot.prototype._isDrawBotCommand = function (message) {
    return message.text.indexOf("db ") === 0;
};

DrawBot.prototype._isRequestingDrawingTopic = function (message) {
    return message.text.indexOf("topic") === 3;
};

DrawBot.prototype._isFromDrawBot = function (message) {
    return message.user === this.user.id;
};

DrawBot.prototype._getRandomTopic = function () {
    return faker.random.words(2);
};

DrawBot.prototype._suggestTopic = function (message) {
    var channel = this._getChannelById(message.channel);

    this.postMessageToChannel(
        channel.name,
        "How about... '" + this._getRandomTopic() + "'?",
        {as_user: true}
    );
};

util.inherits(DrawBot, slackbots);

module.exports = DrawBot;
