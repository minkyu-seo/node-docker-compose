import {Connection, Consumer, Publisher} from "amqplib-plus";
import CustomPublisher from "./publisher/CustomPublisher";
import CustomConsumer from "./consumer/CustomConsumer";

const options = {
    host: "app_rbmq",
    port: 5672,
    user: "rabbitmq",
    pass: "rabbitmq",
    vhost: "/",
    heartbeat: 60,
};

const connection = new Connection(options, console);
const publisher = new CustomPublisher(connection);

const queue = { name: "some_queue_name", options: {} };
const msgContent = "some content";

// const customConsumer = new CustomConsumer(connection, queue.name, {});
//
// customConsumer.run();

[1,2,3,4,5,].forEach((number:Number) => {
    publisher.sendToQueue(queue.name, Buffer.from(`${msgContent} ${number}` ), {});
});

// publisher.publish("target-exchange", "routKey", new Buffer("another content"), {});
