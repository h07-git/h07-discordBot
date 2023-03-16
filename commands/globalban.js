const Discord = require('discord.js');

module.exports = async (client, config, args) => {
  const userId = args[0];
  const reason = args.slice(1).join(' ');
  const bannedServers = [];

  // Loop through the list of servers in the configuration file
  for (const guildId of config.servers) {
    try {
      const guild = await client.guilds.fetch(guildId);

      // Ban the user in each server
      await guild.members.ban(userId, { reason });

      bannedServers.push(guild.name);
    } catch (error) {
      console.error(`Failed to ban user from server ${guildId}: ${error}`);
    }
  }

  // Send a message to the user
  try {
    const user = await client.users.fetch(userId);
    await user.send(`You have been banned from the following servers: ${bannedServers.join(', ')}`);
  } catch (error) {
    console.error(`Failed to send ban message to user ${userId}: ${error}`);
  }

  // Send an embed message to the channel
  const embed = new Discord.MessageEmbed()
    .setColor('#ff0000')
    .setTitle('Global Ban')
    .setDescription(`User <@${userId}> has been banned from ${bannedServers.length} servers.`)
    .addField('Reason', reason)
    .setTimestamp();
  message.channel.send(embed);
};

