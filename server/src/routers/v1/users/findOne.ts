import { Router } from 'express';
import { getRepository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User as UserModel } from '../../../models/User.model';

const r = Router();

r.post('/find', async (req, res) => {
  const { username, password } = req.body;

  const user = await getRepository(UserModel).findOne({
    where: { username },
    select: [
      'id',
      'username',
      'email',
      'country',
      'date_of_birth',
      'inventory_location',
      'state',
    ],
  });

  if (!user) {
    throw new Error('User Not Found with the given Email Address!');
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    throw new Error('Incorrect Password!');
  }

  res.json({
    user,
    success: true,
    status: req.statusCode || 200,
    message: req.statusMessage || 'OK',
  });
});

export { r as findOneUser };
