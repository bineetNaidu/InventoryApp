import { Request, Response } from 'express';
import { BadRequestError } from '../../utils/BadRequestError';
import { ItemTypes } from '../../models/ItemTypes';

export const updateItemType = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  const itemType = await ItemTypes.findOne({
    where: { id },
  });

  if (!itemType) {
    throw new BadRequestError('Item type not found');
  }

  itemType.name = name;

  const updatedData = await itemType.save();

  res.json({
    item_type: updatedData,
    updated: true,
  });
};
