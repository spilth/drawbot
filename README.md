[![Circle CI](https://circleci.com/gh/spilth/drawbot.svg?style=svg)](https://circleci.com/gh/spilth/drawbot)

# Drawbot

A Slackbot that offers random things for you to draw.

## Prerequisites

You need to install NodeJS and Jasmine:

```bash
$ brew install nodejs
$ npm install --global jasmine
```

## Setup

To check out and set up the project:

```bash
$ git clone git@github.com:spilth/drawbot.git
$ cd drawbot
$ npm install
```

## Tests

To run the tests:

```bash
$ npm test
```

## Running Locally

You can start up Drawbot locally with the following:

```
$ BOT_API_KEY=<your_api_key> node bin/bot.js
```

## Usage

DrawBot only responds to messages starting with `db` and currently it only responds to the `topic` command:

```
Brian Kelly [12:58 PM]
db topic

drawbot [12:58 PM]
How about... '1080p Borders'?
```

## Resources

- [Building a Slack Bot with Node.js...](https://scotch.io/tutorials/building-a-slack-bot-with-node-js-and-chuck-norris-super-powers)
