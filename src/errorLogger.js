function logError(client, config, message) {
  const errorChannel = client.channels.cache.get(config.errorChannelId);
  if (errorChannel) {
    errorChannel.send(`:warning: Error: ${message}`);
  } else {
    console.error(`Failed to log error: ${message}`);
  }
}

module.exports = {
  logError
};