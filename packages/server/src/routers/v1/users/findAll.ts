import { Request, Response } from 'express';
import { User } from '../../../models/Users';

export const findAllUsers = async (req: Request, res: Response) => {
  const user = await User.find({
    select: [
      'id',
      'created_at',
      'username',
      'inventory_location',
      'updated_at',
    ],
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
