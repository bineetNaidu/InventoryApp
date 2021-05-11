import { Response, Request } from 'express';
import { getRepository } from 'typeorm';
import { User as UserModel } from '../../../models/User.model';
import { createJWT } from '../../../utils/jwtUtils';

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

  const token = await createJWT(user.id, user.email, user.is_admin || false);

  res.json({
    user,
    token,
    success: true,
    status: req.statusCode,
    message: req.statusMessage,
  });
};
