const rateLimit = new Map();

module.exports ={
    name: "messageCreate",
    async execute(message) {
  if (message.author.bot) return;

  const currentTime = Date.now();
  const limit = 3;
  const timeLimit = 5000;

  if (!rateLimit.has(message.author.id)) {
    rateLimit.set(message.author.id, {
      time: currentTime,
      messages: 1
    });
  } else {
    const authorData = rateLimit.get(message.author.id);
    const timeDiff = currentTime - authorData.time;

    if (timeDiff < timeLimit) {
      authorData.messages++;

      if (authorData.messages > limit) {
        message.delete();
        message.channel.send("Hai inviato troppi messaggi in pochissimo tempo. Attendere prima di inviare nuovi messaggi.");

        return;
      }
    } else {
      authorData.messages = 1;
      authorData.time = currentTime;
    }
  }
}
}