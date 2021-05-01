import { Router } from 'express';
import { getRepository } from 'typeorm';
import { User as UserModel } from '../../../models/User.model';

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

  const user = getRepository(UserModel).create({
    username,
    email,
    password,
    country,
    state,
    inventory_location,
    date_of_birth,
    is_admin: false,
  });

  await user.save();

  res.json({
    user,
    success: true,
    status: req.statusCode,
    message: req.statusMessage,
  });
});

export { r as createUser };
