import { Request, Response } from 'express';
import { InventoryLocations } from '../../models/InventoryLocations';

export const getInventoryLocations = async (_req: Request, res: Response) => {
  const inventoryLocations = await InventoryLocations.find();

  res.json({
    inventoryLocations,
    length: inventoryLocations.length,
    success: true,
  });
};
