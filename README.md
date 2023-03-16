# Discord Bot

This is a Discord bot that provides various moderation features for text and voice channels.

## Features

The bot includes the following features:

- `/globalban` command: Globally bans a member from multiple Discord servers and messages the user directly. Provides an embed message response notifying that the ban was successful or unsuccessful. Works for Discord User IDs too.
- `/globalunban` command: Globally unbans an ID from all synced Discord servers.
- `/globalstaff` command: Provides the mentioned member 'Staff' role across all synced Discord servers.
- `/globalunstaff` command: Removes the mentioned member's 'Staff' role across all synced Discord servers.
- `/join` command: Joins the Voice Channel of the user that sent the command, begins recording the audio of the channel, and saves it in the bot's files.
- `/leave` command: Ends the recording and makes the bot disconnect.

## Installation

To use this bot, you will need to have Node.js and npm installed on your machine.

1. Clone this repository.
2. Navigate to the project directory.
3. Install dependencies: `npm install`
4. Set up the bot by editing the `config.json` file (see below)
5. Start the bot: `npm start`

## Configuration

To configure the bot, edit the current `config.json` file in the project directory.
