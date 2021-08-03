import { Response, Request } from 'express';
import { Item } from '../../../models/Items';
import { BadRequestError } from '../../../utils/BadRequestError';

export const deleteItem = async (req: Request, res: Response) => {
  const item_id = req.params.id;

  const item = await Item.findOne(item_id);

  if (!item) {
    throw new BadRequestError('The Item with the given ID was Not Found');
  }

  await item.remove();

  res.json({
    deleted_item_id: item.id,
    deleted: true,
  });
};
