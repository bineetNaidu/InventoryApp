import { Request, Response } from 'express';
import { ItemTypes } from '../../models/ItemTypes';

export const getAllItemTypes = async (_req: Request, res: Response) => {
  const itemTypes = await ItemTypes.find({});

  res.json({
    item_types: itemTypes,
    success: true,
    length: itemTypes.length,
  });
};
