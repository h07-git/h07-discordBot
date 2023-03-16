module.exports = (client) => {
  client.on('ready', () => {
    client.user.setActivity('Moderating users...');
  });
};
