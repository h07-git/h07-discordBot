// Set up the join command
client.on('message', async (message) => {
  if (message.content.toLowerCase() === '/join' && message.member.voice.channel) {
    const connection = await message.member.voice.channel.join();
    const dispatcher = connection.receiver.createStream(message.author, { mode: 'opus' });
    const audioFile = fs.createWriteStream(`./recordings/${Date.now()}.opus`);

    dispatcher.pipe(audioFile);

    // Set up the leave command
    const leaveCommand = async () => {
      connection.disconnect();
      dispatcher.destroy();
      message.channel.send('Recording ended.');
    };
    client.on('message', leaveCommand);
    setTimeout(() => client.off('message', leaveCommand), 60000); // Remove listener after 60 seconds
  }
});