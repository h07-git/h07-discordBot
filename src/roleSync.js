const config = require('../config.json');

module.exports = {
  syncRoles: async (guild) => {
    // Loop through all the predefined role names in the config
    for (const roleName of config.roleNames) {
      // Find the role with the same name in the current guild
      const role = guild.roles.cache.find(r => r.name === roleName);
      if (!role) {
        console.log(`Could not find role ${roleName} in ${guild.name}. Skipping role sync.`);
        continue;
      }

      // Loop through all the other guilds in the config and sync the role
      for (const guildId of config.guildIds) {
        if (guild.id === guildId) {
          continue;
        }
        const otherGuild = await guild.client.guilds.fetch(guildId);
        if (!otherGuild) {
          console.log(`Could not find guild with ID ${guildId}. Skipping role sync.`);
          continue;
        }

        // Find the role with the same name in the other guild
        const otherRole = otherGuild.roles.cache.find(r => r.name === roleName);
        if (!otherRole) {
          console.log(`Could not find role ${roleName} in ${otherGuild.name}. Skipping role sync.`);
          continue;
        }

        // Add or remove the role from the member
        otherRole.members.forEach((member) => {
          if (member.roles.cache.has(otherRole.id) && !member.roles.cache.has(role.id)) {
            member.roles.remove(otherRole);
            console.log(`Removed role ${roleName} from ${member.user.username} in ${otherGuild.name}.`);
          } else if (!member.roles.cache.has(otherRole.id) && member.roles.cache.has(role.id)) {
            member.roles.add(otherRole);
            console.log(`Added role ${roleName} to ${member.user.username} in ${otherGuild.name}.`);
          }
        });
      }
    }
  }
};
