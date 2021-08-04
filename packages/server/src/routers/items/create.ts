import { Response, Request } from 'express';
import { body } from 'express-validator';
import { ItemTypes } from '../../models/ItemTypes';
import { Manufacturers } from '../../models/Manufacturers';
import { Item } from '../../models/Items';
import { BadRequestError } from '../../utils/BadRequestError';
import { decodeJWT } from '../../utils/jwtUtils';

export const createItemValidation = [
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

export const createItem = async (req: Request, res: Response) => {
  const {
    info,
    name,
    price,
    sku,
    expiration_date,
    purchase_location,
    manufacturer_id,
    item_type_id,
  } = req.body;

  const decodedToken = await decodeJWT(
    req.headers.authorization!.split(' ')[1]
  );

  console.log(decodedToken);

  const item_type = await ItemTypes.findOne({
    id: item_type_id,
  });
  if (!item_type) throw new BadRequestError('Item type not found');

  const manufacturer = await Manufacturers.findOne({
    id: manufacturer_id,
  });
  if (!manufacturer) throw new BadRequestError('Manufacturer not found');

  const item = await Item.create({
    info,
    item_type,
    manufacturer,
    name,
    sku,
    expiration_date,
    price,
    purchase_location,
  }).save();

  res.json({
    item,
    success: true,
    status: req.statusCode,
    message: req.statusMessage,
  });
};
