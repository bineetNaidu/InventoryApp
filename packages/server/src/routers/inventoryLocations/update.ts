import { Request, Response } from 'express';
import { body, param } from 'express-validator';
import { BadRequestError } from '../../utils/BadRequestError';
import { InventoryLocations } from '../../models/InventoryLocations';

export const updateInventoryLocationValidations = [
  body('location')
    .not()
    .isEmpty()
    .withMessage('Should have a location')
    .isLength({
      min: 1,
      max: 100,
    })
    .withMessage('location should have length between 1 to 100')
    .trim()
    .escape(),
  param('id')
    .trim()
    .notEmpty()
    .withMessage('Should have an id')
    .escape()
    .toInt(),
];

export const updateInventoryLocation = async (req: Request, res: Response) => {
  const { location } = req.body;
  const { id } = req.params;

  const inventoryLocation = await InventoryLocations.findOne({
    where: {
      id,
    },
  });
  if (!inventoryLocation) {
    throw new BadRequestError('Inventory location not found');
  }

  inventoryLocation.location = location;
  const updated = await inventoryLocation.save();

  res.json({ inventoryLocation: updated, updated: true });
};
