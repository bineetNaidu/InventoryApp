import { Request, Response } from 'express';
import { User } from '../../../models/User.model';

export const findAllUsers = async (req: Request, res: Response) => {
  const user = await User.find({
    select: ['id', 'username', 'country', 'date_of_birth', 'state'],
    order: {
      id: 'ASC',
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
