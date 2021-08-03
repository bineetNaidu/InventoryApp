import * as bcrypt from 'bcryptjs';
import { body } from 'express-validator';
import { Request, Response } from 'express';
import { User } from '../../../models/Users';
import { createJWT } from '../../../utils/jwtUtils';
import { BadRequestError } from '../../../utils/BadRequestError';

export const loginValidation = [
  body('username').not().isEmpty().trim().escape(),
  body('password').not().isEmpty().trim().escape(),
];

export const loginRoute = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await User.findOne({
    where: { username },
    relations: ['inventory_location'],
  });
  if (!user) {
    throw new BadRequestError('User Not Found with the given username!');
  }
  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    throw new BadRequestError('Incorrect Password!');
  }
  const token = await createJWT(user.id, user.email, user.is_admin || false);

  res.json({
    user, // ! REMOVE USER's PASSWORD IN API RESPONSNS!
    token,
    success: true,
  });
};
