import { Response, Request } from 'express';
import { Item } from '../../../models/Items.model';
import { decodeJWT } from '../../../utils/jwtUtils';

export const createItem = async (req: Request, res: Response) => {
  const {
    name,
    price,
    has_warranty,
    purchase_location,
    info,
    item_type,
    manufacturer,
  } = req.body;

  const decodedToken = await decodeJWT(
    req.headers.authorization!.split(' ')[1]
  );

  const item = await Item.create({
    name,
    price,
    has_warranty,
    purchase_location,
    info,
    item_type,
    manufacturer,
    user_id: decodedToken.id,
  }).save();

  res.json({
    item,
    success: true,
    status: req.statusCode,
    message: req.statusMessage,
  });
};
