import { Request, Response } from 'express';
import { Manufacturer } from '../../../models/Manufacturer.model';

export const updateOneManufacturer = async (req: Request, res: Response) => {
  const manufacturer_id = req.params.id;
  const { brand_name, brand_type } = req.body;

  const manufacturer = await Manufacturer.findOne({
    where: { id: manufacturer_id },
  });

  if (!manufacturer) {
    throw new Error('The Brand with the given ID was Not Found');
  }

  const updatedManufacturer = await Manufacturer.update(manufacturer.id, {
    brand_name,
    brand_type,
  });

  res.json({
    manufacturer: updatedManufacturer.raw,
    updated_manufacturer_id: manufacturer.id,
    updated: true,
    success: true,
  });
};
