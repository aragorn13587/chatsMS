const amqp = require("amqplib");
const createNewUserEvent = require("../events/createNewuserEvent");
class Consumer {

    async consumeMessages() {
        const connection = await amqp.connect("amqp://localhost");
        const channel = await connection.createChannel();

        await channel.assertExchange("msExchange", "direct");

        const q = await channel.assertQueue("UsersActionQueue");

        await channel.bindQueue(q.queue, "msExchange", "user_registered");

        channel.consume(q.queue, (msg) => {
          const data = JSON.parse(msg.content);

          createNewUserEvent.emit("user_registered", data.message);

          channel.ack(msg);
        });
    }
}

module.exports = Consumer;