import { Request, Response } from 'express';
import { Manufacturer } from '../../../models/Manufacturer.model';

export const createManufacturer = async (req: Request, res: Response) => {
  const { brand_name, brand_type } = req.body;

  const manufacturer = await Manufacturer.create({
    brand_name,
    brand_type,
  }).save();

  res.json({
    manufacturer,
    success: true,
  });
};
