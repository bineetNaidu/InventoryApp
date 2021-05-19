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
  if (!process.env.JWT_TOKEN) throw new Error('ENV(JWT_TOKEN) is undefined');
  if (!process.env.DATABASE_URL)
    throw new Error('ENV(DATABASE_URL) is undefined');

  try {
    const connection: Connection = await createConnection({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      database: 'inventory_app',
      entities: [User, Comment, Item, Manufacturer],
    });
    connection.isConnected && console.log('>>> DB is Connected <<<');
  } catch (error) {
    console.log('!!!! >> ', error.message, '<< !!!!');
    process.exit(1);
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
