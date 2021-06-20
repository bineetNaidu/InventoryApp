import { Response, Request } from 'express';
import { decodeJWT } from '../../../utils/jwtUtils';
import { Item } from '../../../models/Items.model';

export const findAllItems = async (req: Request, res: Response) => {
  const decodedToken = await decodeJWT(
    req.headers.authorization!.split(' ')[1]
  );
  console.log(req.headers.authorization);

  if (!decodedToken) return;

  const items = await Item.find({
    where: {
      user_id: decodedToken.id,
    },
  });

  res.json({
    items,
    lenght: items.length,
    success: true,
  });
};
