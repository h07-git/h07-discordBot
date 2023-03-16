const Discord = require('discord.js');

module.exports = async (client, config, args) => {
  const userId = args[0];
  const unbannedServers = [];

  // Loop through the list of servers in the configuration file
  for (const guildId of config.servers) {
    try {
      const guild = await client.guilds.fetch(guildId);

      // Unban the user in each server
      await guild.members.unban(userId);

      unbannedServers.push(guild.name);
    } catch (error) {
      console.error(`Failed to unban user from server ${guildId}: ${error}`);
    }
  }

  // Send an embed message to the channel
  const embed = new Discord.MessageEmbed()
    .setColor('#00ff00')
    .setTitle('Global Unban')
    .setDescription(`User with ID ${userId} has been unbanned from ${unbannedServers.length} servers.`)
    .setTimestamp();
  message.channel.send(embed);
};
