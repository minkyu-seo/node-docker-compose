import { Connection, Publisher } from 'amqplib-plus';
import { Channel, Message } from 'amqplib';

const preparePublisher = async (ch: Channel) => {
  // await ch.assertQueue("target-queue", { durable: false });
  // await ch.assertExchange("target-exchange", "direct");
  // await ch.bindQueue("target-queue", "target-exchange", "routKey");
  console.log(`Publisher ready ${ch}`);
};

export default class CustomPublisher extends Publisher {
  constructor(conn: Connection) {
    super(conn, preparePublisher);
  }

  console.log('test');

  sendToQueue(queue: string, content: Buffer, options: {}): Promise<void> {
    return super.sendToQueue(queue, content, options);
  }
}
