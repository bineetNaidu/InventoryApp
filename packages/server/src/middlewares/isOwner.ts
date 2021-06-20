import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { Item } from '../models/Items.model';
import { decodeJWT } from '../utils/jwtUtils';

export const isItemsOwner = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization!.split(' ')[1];
  const decode = await decodeJWT(token);

  // @ts-ignore
  const user_id = decode!.id;
  const item_id = req.params.id;

  const item = await getRepository(Item).findOne(item_id);
  if (!item) throw new Error('Item Not Found');

  if (item && item.user_id === user_id) {
    return next();
  }
  throw new Error('Not Authorized To Access The Data!');
};
