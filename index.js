const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('./config.json');
const roleSync = require('./roleSync.js');
const banSync = require('./banSync.js');
const errorLogger = require('./errorLogger.js');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('guildMemberUpdate', (oldMember, newMember) => {
  roleSync.syncRoles(client, config, newMember);
});

client.on('guildBanAdd', (guild, user) => {
  banSync.syncBan(client, config, guild, user);
});

client.login(config.token);