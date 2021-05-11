import { Router } from 'express';
import { getRepository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User as UserModel } from '../../../models/User.model';
import { createJWT } from '../../../utils/jwtUtils';

const r = Router();

r.post('/find', async (req, res) => {
  const { username, password } = req.body;
  console.log('1');

  const user = await getRepository(UserModel).findOne({
    where: { username },
  });
  if (!user) {
    throw new Error('User Not Found with the given username!');
  }
  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    throw new Error('Incorrect Password!');
  }
  const token = await createJWT(user.id, user.email, user.is_admin || false);

  res.json({
    user, // ! REMOVE USER's PASSWORD IN API RESPONSNS!
    token,
    success: true,
    status: req.statusCode || 200,
    message: req.statusMessage || 'OK',
  });
});

export { r as findOneUser };
// {
//     "username": "user3",
//     "password": "password",
//     "country": "Sweden",
//     "date_of_birth": "12-11-2011",
//     "state": "",
//     "email": "user3@gmail.com",
//     "inventory_location": "home"
// }
