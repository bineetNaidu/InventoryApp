import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User as UserModel } from '../../../models/User.model';

export const findAllUsers = async (req: Request, res: Response) => {
  const user = await getRepository(UserModel).find({
    select: ['id', 'username', 'country', 'date_of_birth', 'state'],
    order: {
      id: 'DESC',
    },
  });

  res.json({
    user,
    length: user.length,
    success: true,
    status: req.statusCode || 200,
    message: req.statusMessage || 'OK',
  });
};
