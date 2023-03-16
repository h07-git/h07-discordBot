const Discord = require('discord.js');

module.exports = async (client, config, args) => {
  const userId = args[0];
  const staffRole = 'Staff';
  const addedServers = [];

  // Loop through the list of servers in the configuration file
  for (const guildId of config.servers) {
    try {
      const guild = await client.guilds.fetch(guildId);

      // Add the Staff role to the user in each server
      const member = await guild.members.fetch(userId);
      await member.roles.add(staffRole);

      addedServers.push(guild.name);
    } catch (error) {
      console.error
