import { Request, Response } from 'express';
import { body } from 'express-validator';
import { getConnection } from 'typeorm';
import { Item } from '../../models/Items';

export const updateItemValidations = [
  body('name')
    .not()
    .isEmpty()
    .withMessage('Should have a name')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Should have a name between 1 and 100 characters')
    .escape(),
  body('info')
    .not()
    .isEmpty()
    .withMessage('Should have a info')
    .trim()
    .isLength({ min: 1, max: 300 })
    .withMessage('Should have a info between 1 and 300 characters')
    .escape(),
  body('price')
    .not()
    .isEmpty()
    .withMessage('Should have a price')
    .not()
    .isString()
    .withMessage('price should be a number')
    .trim()
    .escape(),
  body('expiration_date')
    .not()
    .isEmpty()
    .withMessage('Should have a expiration_date')
    .isDate()
    .withMessage('Should have a expiration_date in the format of YYYY-MM-DD')
    .trim()
    .escape(),
  body('purchase_location').trim().escape(),
  body('sku').trim().escape(),
  body('manufacturer_id')
    .not()
    .isEmpty()
    .withMessage('Please provide a manufacturer_id')
    .not()
    .isString()
    .withMessage('manufacturer_id has to be a number')
    .trim()
    .escape(),
  body('item_type_id')
    .not()
    .isEmpty()
    .withMessage('Please provide a item_type')
    .not()
    .isString()
    .withMessage('item_type has to be a number')
    .trim()
    .escape(),
];

export const updateItem = async (req: Request, res: Response) => {
  const item_id = req.params.id;
  const item = await Item.findOne(item_id);

  if (!item) {
    throw new Error('The Item with the given ID was Not Found');
  }

  const updatedItem = await getConnection()
    .createQueryBuilder()
    .update(Item)
    .set(req.body)
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
