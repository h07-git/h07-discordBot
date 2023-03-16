function syncBan(client, config, guild, user) {
  for (const server of config.servers) {
    if (server.id === guild.id) {
      for (const syncedServer of config.servers) {
        if (syncedServer.id !== server.id) {
          const syncedGuild = client.guilds.cache.get(syncedServer.id);
          syncedGuild.members.ban(user, { reason: 'Synced ban from other server' })
            .catch(error => {
              console.error(`Failed to sync ban for ${user.tag} in ${syncedServer.name}:`, error);
              errorLogger.logError(client, config, `Failed to sync ban for ${user.tag} in ${syncedServer.name}: ${error.message}`);
            });
        }
      }
      break;
    }
  }
}

module.exports = {
  syncBan
};