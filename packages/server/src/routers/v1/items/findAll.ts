import { Response, Request } from 'express';
import { Item } from '../../../models/Items.model';

export const findAllItems = async (_req: Request, res: Response) => {
  const item = await Item.find({ order: { id: 'ASC' } });

  res.json({
    item,
    lenght: item.length,
    success: true,
  });
};
