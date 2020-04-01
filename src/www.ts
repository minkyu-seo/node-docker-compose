import sourceMapSupport from 'source-map-support';
import { Request, Response, NextFunction } from 'express';
import App from './App';

sourceMapSupport.install();

const port: number = Number(process.env.PORT) || 3000;
const { app } = new App();

interface Err extends Error {
  status: number
  data: any
}

app.listen(port, () => console.log(`Express server listening at ${port}`))
  .on('error', err => console.error(err));

app.use((req: Request, res: Response, next: NextFunction) => {
  const err = new Error('Not Found') as Err;
  err.status = 404;
  next(err);
});

// error handle
app.use((err: Err, req: Request, res: Response, next: NextFunction) => {
  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    data: err.data,
  });
});
