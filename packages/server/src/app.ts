import 'reflect-metadata';
import express from 'express';
import logger from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import NotFoundError from './utils/NotFoundError';
import ExpressErrorHandler from './utils/ExpressErrorHandler';
import 'express-async-errors';

// ***** Routers Routes ******
import { v1Routes } from './routers/v1';

//  ****** Constants *******
const app = express();

// ***** Middlewares *****
app.use(express.json());
app.use(logger('dev'));
app.use(cors());
app.use(helmet());

app.use('/api', v1Routes);

//! Not found page error
app.all('*', () => {
  throw new NotFoundError();
});
// ! Error Handlers
app.use(ExpressErrorHandler);

export default app;
