const amqp = require("amqplib");
var faker = require("faker");
faker.locale = "pt_BR";

async function connect() {
  const message = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    birth: faker.date.past(),
  };

  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    const queue = await channel.assertQueue("Jobs");
    channel.sendToQueue("Jobs", Buffer.from(JSON.stringify(message)));
    console.log("Job sent successfully", message);
    console.log("Message count", queue.messageCount);
    //   connection.close().then(() => console.log("Connection closed."));
    setTimeout(() => {
      console.log("Message count", queue.messageCount);
      connection.close().then(() => console.log("Connection closed."));
    }, 100);
  } catch (err) {
    console.error(err);
  }
}

connect();
