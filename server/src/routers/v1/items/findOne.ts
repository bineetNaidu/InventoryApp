import { Response, Request } from 'express';
import { getRepository } from 'typeorm';
import { Item as ItemModel } from '../../../models/Items.model';

export const findItem = async (req: Request, res: Response) => {
  const item_id = req.params.id;

  const item = await getRepository(ItemModel).findOne(item_id);

  if (!item) {
    throw new Error('The Item with the given ID was Not Found');
  }

  res.json({
    item: item,
    success: true,
  });
};
