import { Request, Response } from 'express';
import { param } from 'express-validator';
import { BadRequestError } from '../../utils/BadRequestError';
import { InventoryLocations } from '../../models/InventoryLocations';

export const deleteInventoryLocationValidations = [
  param('id')
    .trim()
    .notEmpty()
    .withMessage('Should have an id')
    .escape()
    .toInt(),
];

export const deleteInventoryLocation = async (req: Request, res: Response) => {
  const { id } = req.params;

  const inventoryLocation = await InventoryLocations.findOne({
    where: { id },
  });

  if (!inventoryLocation) {
    throw new BadRequestError('Inventory location not found');
  }

  await inventoryLocation.remove();

  res.json({
    deleted: true,
    deleted_inventory_location_id: id,
  });
};
