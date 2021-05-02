import { Response, Request } from 'express';
import { getRepository } from 'typeorm';
import { Item as ItemModel } from '../../../models/Items.model';

export const findItem = async (req: Request, res: Response) => {
  const item_id = req.params.id;
  const item = await getRepository(ItemModel).find({ where: { id: item_id } });

  if (!item.length) {
    throw new Error('No Items was found with the given item ID!');
  }

  res.json({
    item: item[0],
    success: true,
  });
};
