import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Item as ItemModel } from '../../../models/Items.model';

export const updateItem = async (req: Request, res: Response) => {
  const item_id = req.params.id;
  const {
    name,
    price,
    has_warranty,
    purchase_location,
    info,
    item_type,
  } = req.body;

  const item = await getRepository(ItemModel).find({
    where: { id: item_id },
    order: {
      id: 'ASC',
    },
  });

  if (!item.length) {
    throw new Error('The Item with the given ID was Not Found');
  }

  await getRepository(ItemModel)
    .createQueryBuilder()
    .update(ItemModel)
    .set({ name, price, has_warranty, purchase_location, info, item_type })
    .where('id = :id', { id: item[0].id })
    .execute();

  res.json({
    item: item[0], // ! FIX THIS! (it show backdated data)
    updated_item_id: item[0].id,
    updated: true,
    success: true,
  });
};
