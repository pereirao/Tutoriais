const amqp = require("amqplib");

async function connect() {

    try {
        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();
        const result = await channel.assertQueue("Jobs");
        channel.consume("Jobs", message => {
            const input = JSON.parse(message.content.toString());
            channel.ack(message);
            console.log("Mensagem recebida\n", input);
        });
        console.log("Aguardando novas mensagens...");
    } catch (err) {
        console.error(err);
    }
}

connect();
