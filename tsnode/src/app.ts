import express, { Express } from 'express';
let app: Express = express();
import indexRouter from './routes/index';
import usersRouter from './routes/users';

app.use('/', indexRouter);
app.use('/users', usersRouter);

export default app;