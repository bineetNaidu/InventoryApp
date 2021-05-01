import { Response, Request } from 'express';
import { getRepository } from 'typeorm';
import { User as UserModel } from '../../../models/User.model';

export const signup = async (req: Request, res: Response) => {
  const {
    username,
    email,
    password,
    country,
    state,
    inventory_location,
    date_of_birth,
  } = req.body;

  const user = await getRepository(UserModel)
    .create({
      username,
      email,
      password,
      country,
      state,
      inventory_location,
      date_of_birth,
      is_admin: false,
    })
    .save();

  res.json({
    user,
    success: true,
    status: req.statusCode,
    message: req.statusMessage,
  });
};
