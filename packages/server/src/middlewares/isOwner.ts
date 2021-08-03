import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../utils/BadRequestError';
import { NotAuthorizedError } from '../utils/NotAuthorized';
import { getRepository } from 'typeorm';
import { Item } from '../models/Items';
import { decodeJWT } from '../utils/jwtUtils';

export const isItemsOwner = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization!.split(' ')[1];
  const decode = await decodeJWT(token);

  const user_id = decode!.id;
  const item_id = req.params.id;

  const item = await getRepository(Item).findOne(item_id);
  if (!item) throw new BadRequestError('Item Not Found');

  // @ts-ignore
  if (item && item.user === user_id) {
    return next();
  }
  throw new NotAuthorizedError();
};
