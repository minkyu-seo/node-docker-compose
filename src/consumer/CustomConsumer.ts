import {Connection, Consumer} from "amqplib-plus";
import {Channel, Message, Options} from "amqplib";

const prepareConsumer = async (ch: Channel) => {
    // await ch.assertQueue(queue.name, { durable: true });
    // await ch.prefetch(5);
    console.log("Consumer ready " + ch);
};

export default class CustomPublisher extends Consumer {

    queueName: string;
    opt: Object;

    constructor(conn: Connection, queueName: string, opt: Object) {
        super(conn, prepareConsumer, false, console);
        this.queueName = queueName;
        this.opt = opt;
    }

    run(): Promise<string> {
        if (this.queueName && this.opt) {
            return super.consume(this.queueName, this.opt);
        } else {
            throw new Error("queueName, opt")
        }
    }

    processMessage(msg: Message, channel: Channel) {
        // Your own messages process logic
        console.log("Message headers:", JSON.stringify(msg.properties.headers));
        console.log("Message body:", msg.content.toString(), "\n");
        //     return channel.nack(msg);
        channel.ack(msg);
    }
}
