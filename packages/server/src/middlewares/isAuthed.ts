import { NextFunction, Request, Response } from 'express';
import { decodeJWT } from '../utils/jwtUtils';

export const isAuthed = (req: Request, _res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization!.split(' ')[1];
    const decode = decodeJWT(token);

    decode.then((data) => {
      if (data) {
        return next();
      } else {
        throw new Error('Please Log in First');
      }
    });
  } catch (e) {
    throw new Error('Please Log in First');
  }
};
