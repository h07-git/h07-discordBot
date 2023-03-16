const fs = require('fs');
const Discord = require('discord.js');
const config = require('./config.json');

const client = new Discord.Client();

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(file.split('.')[0], command);
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
  // Ignore messages from bots
  if (message.author.bot) return;

  // Check if the message starts with the command prefix
  if (!message.content.startsWith(config.prefix)) return;

  // Split the message into the command and arguments
  const args = message.content.slice(config.prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  // Get the command function from the commands collection
  const command = client.commands.get(commandName);

  // If the command doesn't exist, exit early
  if (!command) return;

  // Call the command function with the client, config, and arguments
  command(client, config, args)
    .catch(error => {
      console.error(`Error executing command "${commandName}": ${error}`);
      message.reply('There was an error executing that command!');
    });
});

client.login(config.token);
require('./setActivity')(client);
