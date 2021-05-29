import { Router } from 'express';
import * as bcrypt from 'bcryptjs';
import { User } from '../../../models/User.model';
import { createJWT } from '../../../utils/jwtUtils';

const r = Router();

r.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({
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
