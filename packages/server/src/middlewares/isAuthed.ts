import { NextFunction, Request, Response } from 'express';
import { NotAuthorizedError } from '../utils/NotAuthorized';
import { decodeJWT } from '../utils/jwtUtils';

export const isAuthed = (req: Request, _res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization!.split(' ')[1];
    const decode = decodeJWT(token);

    decode.then((data) => {
      if (data) {
        return next();
      } else {
        throw new NotAuthorizedError();
      }
    });
  } catch (e) {
    throw new NotAuthorizedError();
  }
};
