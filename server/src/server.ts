import { Connection, createConnection } from 'typeorm';
import dotenv from 'dotenv';
import app from './app';
import { User } from './models/User.model';
import { Comment } from './models/Comment.model';
import { Item } from './models/Items.model';
import { Manufacturer } from './models/Manufacturer.model';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}
const PORT = process.env.PORT || 4242;

(async () => {
  if (!process.env.DB_HOST) throw new Error('ENV(DB_HOST) is undefined');

  if (!process.env.DB_USERNAME)
    throw new Error('ENV(DB_USERNAME) is undefined');

  if (!process.env.DB_PASSWORD)
    throw new Error('ENV(DB_PASSWORD) is undefined');

  if (!process.env.JWT_TOKEN) throw new Error('ENV(JWT_TOKEN) is undefined');

  try {
    const connection: Connection = await createConnection({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: 'inventory_app',
      entities: [User, Comment, Item, Manufacturer],
    });
    connection.isConnected && console.log('>>> DB is Connected <<<');
  } catch (error) {
    console.log('!!!! >> ', error.message, '<< !!!!');
  }

  // **** Listeners ****
  app.listen(PORT, () => {
    console.log('-----------------------------------------');
    console.log('>>> INVENTORY API SERVER HAS STARTED <<<');
    console.log('-----------------------------------------');
    if (process.env.NODE_ENV !== 'production') {
      console.log('>> visit: http://localhost:' + PORT);
    }
  });
})();
