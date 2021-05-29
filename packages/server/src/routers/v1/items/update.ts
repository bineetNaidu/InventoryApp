import { Request, Response } from 'express';
import { getConnection } from 'typeorm';
import { Item } from '../../../models/Items.model';

export const updateItem = async (req: Request, res: Response) => {
  const item_id = req.params.id;
  const { name, price, has_warranty, purchase_location, info, item_type } =
    req.body;

  const item = await Item.findOne(item_id);

  if (!item) {
    throw new Error('The Item with the given ID was Not Found');
  }

  const updatedItem = await getConnection()
    .createQueryBuilder()
    .update(Item)
    .set({
      name,
      price,
      has_warranty,
      purchase_location,
      info,
      item_type,
    })
    .where('id = :id', { id: item.id })
    .returning('*')
    .execute();

  res.json({
    item: updatedItem.raw[0],
    updated_item_id: item.id,
    updated: true,
    success: true,
  });
};
