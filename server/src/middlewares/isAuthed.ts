import { NextFunction, Request, Response } from 'express';
import { decodeJWT } from '../utils/jwtUtils';

export const isAuthed = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization!.split(' ')[1];
    const decode = decodeJWT(token);
    if (decode) {
      return next();
    } else {
      throw new Error('Please Log in First');
    }
  } catch (e) {
    throw new Error('Please Log in First');
  }
};
