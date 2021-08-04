import { Request, Response } from 'express';
import { BadRequestError } from '../../utils/BadRequestError';
import { ItemTypes } from '../../models/ItemTypes';

export const deleteItemType = async (req: Request, res: Response) => {
  const { id } = req.params;

  const itemType = await ItemTypes.findOne(id);
  if (!itemType) {
    throw new BadRequestError('Item type not found');
  }

  await itemType.remove();

  res.json({
    deleted: true,
    deleted_item_type_id: id,
  });
};
