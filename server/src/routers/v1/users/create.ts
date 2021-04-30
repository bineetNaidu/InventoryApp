import { Router } from 'express';
import { User } from '..';

const r = Router();

r.post('/create', async (req, res) => {
  const {
    username,
    email,
    password,
    country,
    state,
    inventory_location,
    date_of_birth,
  } = req.body;

  const user = User.create({
    username,
    email,
    password,
    country,
    state,
    inventory_location,
    date_of_birth,
  });
  await user.save();

  res.json({
    user,
    success: true,
  });
});

export { r as createUser };
