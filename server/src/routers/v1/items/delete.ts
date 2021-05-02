import { Response, Request } from 'express';
import { getRepository } from 'typeorm';
import { Item as ItemModel } from '../../../models/Items.model';

export const deleteItem = async (req: Request, res: Response) => {
  const item_id = req.params.id;

  const item = await getRepository(ItemModel).find({
    where: { id: item_id },
    order: {
      id: 'ASC',
    },
  });

  if (!item.length) {
    throw new Error('The ITEM with the given ID was Not Found');
  }

  await getRepository(ItemModel)
    .createQueryBuilder()
    .delete()
    .from(ItemModel)
    .where('id = :id', { id: item[0].id })
    .execute();

  res.json({
    item: item[0],
    deleted_item_id: item[0].id,
    deleted: true,
    success: true,
  });
};
