import { Request, Response } from 'express';
import { body } from 'express-validator';
import { InventoryLocations } from '../../models/InventoryLocations';

export const createInventoryLocationValidations = [
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
];

export const createInventoryLocation = async (req: Request, res: Response) => {
  const { location } = req.body;

  const inventoryLocation = await InventoryLocations.create({
    location,
  }).save();

  res.status(201).json({
    inventoryLocation,
    created: true,
    success: true,
  });
};
