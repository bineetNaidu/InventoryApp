import { NextFunction, Request, Response } from 'express';
import { decodeJWT } from '../utils/jwtUtils';

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization!.split(' ')[1];
    const decode = decodeJWT(token);

    // @ts-ignore
    if (decode && decode.is_admin) {
      return next();
    } else {
      throw new Error('UNAUTHORIZED ACCESS!');
    }
  } catch (e) {
    throw new Error('UNAUTHORIZED ACCESS!');
  }
};
