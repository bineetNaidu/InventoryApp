import { Request, Response } from 'express';
import { Manufacturer } from '../../../models/Manufacturer.model';

export const deleteOneManufacturer = async (req: Request, res: Response) => {
  const manufacturer_id = req.params.id;

  const manufacturer = await Manufacturer.findOne(manufacturer_id);

  if (!manufacturer) {
    throw new Error('The Brand with the given ID was Not Found');
  }

  await Manufacturer.delete(manufacturer.id);

  res.json({
    manufacturer,
    deleted_manufacturer_id: manufacturer.id,
    deleted: true,
    success: true,
  });
};
