import graphqlHTTP from 'express-graphql';
import { buildSchema } from 'graphql';
// eslint-disable-next-line no-unused-vars
import express from 'express';

// import { Request, Response } from 'express';

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const root = {
  hello: () => 'Hello world!',
};

class App {
    public application : express.Application;

    constructor() {
      this.application = express();
    }
}

const app = new App().application;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('start');
});

app.get('/js', (req: express.Request, res: express.Response) => {
  res.sendFile('/source/import.js', { root: __dirname });
  // res.send("start");
});

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));

interface Err extends Error {
    status: number
    data?: any
}

// catch 404 and forward to error handler
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  const err = new Error('Not Found') as Err;
  err.status = 404;
  next(err);
});

// error handle
app.use((err: Err, req: express.Request, res: express.Response, next: express.NextFunction) => {
  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    data: err.data,
  });
});

const port = 4000;
app.listen(port, () => console.log(`Server Start : ${port} `));
