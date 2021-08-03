import { Response, Request } from 'express';
import { Item } from '../../../models/Items';

export const findItem = async (req: Request, res: Response) => {
  const item_id = req.params.id;

  const item = await Item.findOne(item_id);

  if (!item) {
    throw new Error('The Item with the given ID was Not Found');
  }

  res.json({
    item: item,
    success: true,
  });
};
