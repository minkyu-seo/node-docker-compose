import express from "express";
import graphqlHTTP from "express-graphql";
import { buildSchema } from "graphql";
import { Request, Response } from "express";
import * as Amqp from "amqp-ts";

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const root = {
    hello: () => {
        return 'Hello world!';
    },
};

class App {
    public application : express.Application;
    constructor(){
        this.application = express();
    }
}

const app = new App().application;

app.use(express.json());
app.use(express.urlencoded( {extended : false } ));

app.get("/",(req : Request , res : Response) => {
    res.send("start");
});

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

interface Err extends Error {
    status: number
    data?: any
}

// catch 404 and forward to error handler
app.use(function (req: express.Request, res: express.Response, next: express.NextFunction) {
    let err = new Error('Not Found') as Err
    err.status = 404
    next(err)
});

// error handle
app.use(function (err: Err, req: express.Request, res: express.Response, next: express.NextFunction) {
    // render the error page
    res.status(err.status || 500)
    res.json({
        message: err.message,
        data: err.data
    })
});

const connection = new Amqp.Connection("amqp://localhost");
const exchange = connection.declareExchange("ExchangeName");
const queue = connection.declareQueue("QueueName");
queue.bind(exchange);
queue.activateConsumer((message) => {
    console.log("Message received: " + message.getContent());
});

// it is possible that the following message is not received because
// it can be sent before the queue, binding or consumer exist
// const msg = new Amqp.Message("Test");
// exchange.send(msg);

connection.completeConfiguration().then(() => {
    // the following message will be received because
    // everything you defined earlier for this connection now exists
    var msg2 = new Amqp.Message("Test2");
    exchange.send(msg2);
});

const port = 4000;
app.listen(port,() => console.log(`Server Start : ${port} `));



