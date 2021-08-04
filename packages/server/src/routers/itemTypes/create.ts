import { Request, Response } from 'express';
import { body } from 'express-validator';
import { ItemTypes } from '../../models/ItemTypes';

export const itemTypeValidation = [
  body('name')
    .not()
    .isEmpty()
    .withMessage('Should have a name')
    .trim()
    .isLength({ min: 1, max: 80 })
    .withMessage('Should have a name between 1 and 80 characters')
    .escape(),
];

export const createItemType = async (req: Request, res: Response) => {
  const { name } = req.body;

  const item_type = await ItemTypes.create({
    name,
  }).save();

  res.status(201).json({ item_type, created: true });
};
