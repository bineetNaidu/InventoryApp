import dotenv from 'dotenv';
import path from 'path';
import app from './app';
import { Connection, createConnection } from 'typeorm';
import { User } from './models/Users';
import { Comment } from './models/Comments';
import { Item } from './models/Items';
import { ___prod___ } from './utils/constants';
import { InventoryLocations } from './models/InventoryLocations';
import { ItemTypes } from './models/ItemTypes';
import { Manufacturers } from './models/Manufacturers';

if (!___prod___) {
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
      entities: [
        InventoryLocations,
        ItemTypes,
        Manufacturers,
        User,
        Item,
        Comment,
      ],
      logging: !___prod___,
      synchronize: true, //!___prod___,
      migrations: [path.join(__dirname, './migrations/*')],
    });
    connection.isConnected && console.log('>>> DB is Connected <<<');

    await connection.runMigrations();
  } catch (error) {
    console.log('!!!! >> ', error.message, '<< !!!!');
    process.exit(1);
  }

  // **** Listeners ****
  app.listen(PORT, () => {
    console.log('-----------------------------------------');
    console.log('>>> INVENTORY API SERVER HAS STARTED <<<');
    console.log('-----------------------------------------');
    if (!___prod___) {
      console.log('>> visit: http://localhost:' + PORT);
    }
  });
})();
