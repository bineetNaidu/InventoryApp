import { Response, Request } from 'express';
import { getRepository } from 'typeorm';
import { Item as ItemModel } from '../../../models/Items.model';
import { decodeJWT } from '../../../utils/jwtUtils';

export const createItem = async (req: Request, res: Response) => {
  const {
    name,
    price,
    has_warranty,
    purchase_location,
    info,
    item_type,
    manufacturer_id,
  } = req.body;

  const decodedToken = await decodeJWT(
    req.headers.authorization!.split(' ')[1]
  );

  const item = await getRepository(ItemModel)
    .create({
      name,
      price,
      has_warranty,
      purchase_location,
      info,
      item_type,
      // @ts-ignore
      user_id: decodedToken!.id,
      manufacturer_id,
    })
    .save();

  res.json({
    item,
    success: true,
    status: req.statusCode,
    message: req.statusMessage,
  });
};
