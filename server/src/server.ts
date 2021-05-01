import express from 'express';
import logger from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import { Connection, createConnection } from 'typeorm';
import dotenv from 'dotenv';
import NotFoundError from './utils/NotFoundError';
import ExpressErrorHandler from './utils/ExpressErrorHandler';
import 'express-async-errors';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

// ***** Routers Routes ******
import { v1Routes } from './routers/v1';

//  ****** Constants *******
(async () => {
  const app = express();
  const PORT = process.env.PORT || 4242;

  const connection: Connection = await createConnection({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'inventory_app',
    entities: ['models/*.model.ts'],
  });

  // ***** Middlewares *****
  app.use(express.json());
  app.use(logger('dev'));
  app.use(cors());

  app.get('/', (req, res) => {
    res.json({ msg: 'hello bineet' });
  });

  app.use('/api', v1Routes);

  //! Not found page error
  app.all('*', () => {
    throw new NotFoundError();
  });
  // ! Error Handlers
  app.use(ExpressErrorHandler);

  // **** Listeners ****
  app.listen(PORT, () => {
    console.log('-----------------------------------------');
    console.log('>>> INVENTORY API SERVER HAS STARTED <<<');
    connection.isConnected && console.log('>>> DB is Connected <<<');
    console.log('-----------------------------------------');
    if (process.env.NODE_ENV !== 'production') {
      console.log('>> visit: http://localhost:' + PORT);
    }
  });
})();
