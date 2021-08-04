import path from 'path';
import { Comment } from '../models/Comments';
import { InventoryLocations } from '../models/InventoryLocations';
import { Item } from '../models/Items';
import { ItemTypes } from '../models/ItemTypes';
import { Manufacturers } from '../models/Manufacturers';
import { User } from '../models/Users';
import { Connection } from 'typeorm';
import { createConnection } from 'typeorm';
import { createJWT } from '../utils/jwtUtils';

let conn: Connection;

declare global {
  namespace NodeJS {
    interface Global {
      signin(isAdmin: boolean): string[];
    }
  }
}

beforeAll(async () => {
  process.env.JWT_TOKEN = 'testjwtbutholdondontsteelthistokenpleaseehackerplzz';
  conn = await createConnection({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: 'test',
    entities: [
      InventoryLocations,
      ItemTypes,
      Manufacturers,
      User,
      Item,
      Comment,
    ],
    logging: false,
    synchronize: true,
    migrations: [path.join(__dirname, './migrations/*')],
  });
  await conn.runMigrations();
});

afterAll(async () => {
  await conn.dropDatabase();
  await conn.close();
});

global.signin = (admin = false) => {
  //? Create a JWT
  const token = createJWT(1, 'test@test.com', admin);
  const session = { token };
  const sessJson = JSON.stringify(session);
  const base64 = Buffer.from(sessJson).toString('base64');
  return [`express:sess=${base64}`];
};
