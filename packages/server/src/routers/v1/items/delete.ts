import { Response, Request } from 'express';
import { Item } from '../../../models/Items.model';

export const deleteItem = async (req: Request, res: Response) => {
  const item_id = req.params.id;

  const item = await Item.findOne(item_id);

  if (!item) {
    throw new Error('The Item with the given ID was Not Found');
  }

  await Item.delete(item.id);

  res.json({
    deleted_item_id: item.id,
    deleted: true,
    success: true,
  });
};
