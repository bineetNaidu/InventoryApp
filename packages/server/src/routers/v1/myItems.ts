import { Request, Response } from 'express';
import { Item } from '../../models/Items.model';
import { User } from '../../models/User.model';
import { decodeJWT } from '../../utils/jwtUtils';

export const myItems = async (req: Request, res: Response) => {
  const decodedToken = await decodeJWT(
    req.headers.authorization!.split(' ')[1]
  );

  if (!decodedToken) return;

  const items = await Item.find({
    where: {
      user_id: (decodedToken as User).id,
    },
  });

  res.json({
    items,
    success: true,
    total: items.length,
  });
};
