import { Response, Request } from 'express';
import { getRepository } from 'typeorm';
import { Item as ItemModel } from '../../../models/Items.model';

export const findAllItems = async (req: Request, res: Response) => {
  const item = await getRepository(ItemModel).find({ order: { id: 'ASC' } });

  res.json({
    item,
    lenght: item.length,
    success: true,
  });
};
