import { Response, Request } from 'express';
import { decodeJWT } from '../../utils/jwtUtils';
import { Item } from '../../models/Items';

export const findAllItems = async (req: Request, res: Response) => {
  const decodedToken = await decodeJWT(
    req.headers.authorization!.split(' ')[1]
  );

  if (!decodedToken) return;

  const items = await Item.find({
    where: {
      user: decodedToken.id,
    },
  });

  res.json({
    items,
    lenght: items.length,
    success: true,
  });
};
