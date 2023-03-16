function syncRoles(client, config, member) {
  for (const server of config.servers) {
    if (server.id === member.guild.id) {
      for (const syncedServer of config.servers) {
        if (syncedServer.id !== server.id) {
          const syncedMember = client.guilds.cache.get(syncedServer.id).members.cache.get(member.id);
          if (syncedMember) {
            syncedMember.roles.set(member.roles.cache)
              .catch(error => {
                console.error(`Failed to sync roles for ${syncedMember.user.tag} in ${syncedServer.name}:`, error);
                errorLogger.logError(client, config, `Failed to sync roles for ${syncedMember.user.tag} in ${syncedServer.name}: ${error.message}`);
              });
          }
        }
      }
      break;
    }
  }
}

module.exports = {
  syncRoles
};
