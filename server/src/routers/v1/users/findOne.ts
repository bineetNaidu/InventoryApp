import { Router } from 'express';
import { getRepository } from 'typeorm';
import { User as UserModel } from '../../../models/User.model';

const r = Router();

r.post('/find', async (req, res) => {
  const { username, password } = req.body;

  const user = await getRepository(UserModel).findOne({
    where: { username, password },
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

  res.json({
    user,
    success: true,
    status: req.statusCode || 200,
    message: req.statusMessage || 'OK',
  });
});

export { r as findOneUser };
