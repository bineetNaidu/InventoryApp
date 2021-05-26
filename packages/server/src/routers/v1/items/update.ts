import { Request, Response } from 'express';
import { Item } from '../../../models/Items.model';

export const updateItem = async (req: Request, res: Response) => {
  const item_id = req.params.id;
  const { name, price, has_warranty, purchase_location, info, item_type } =
    req.body;

  const item = await Item.findOne(item_id);

  if (!item) {
    throw new Error('The Item with the given ID was Not Found');
  }

  const updatedItem = await Item.update(item.id, {
    name,
    price,
    has_warranty,
    purchase_location,
    info,
    item_type,
  });

  res.json({
    item: updatedItem.raw,
    updated_item_id: item.id,
    updated: true,
    success: true,
  });
};
