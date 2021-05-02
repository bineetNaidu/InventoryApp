import { Response, Request } from 'express';
import { getRepository } from 'typeorm';
import { Item as ItemModel } from '../../../models/Items.model';

export const deleteItem = async (req: Request, res: Response) => {
  const item_id = req.params.id;

  const item = await getRepository(ItemModel).findOne(item_id);

  if (!item) {
    throw new Error('The Item with the given ID was Not Found');
  }

  await getRepository(ItemModel)
    .createQueryBuilder()
    .delete()
    .from(ItemModel)
    .where('id = :id', { id: item.id })
    .execute();

  res.json({
    item,
    deleted_item_id: item.id,
    deleted: true,
    success: true,
  });
};
