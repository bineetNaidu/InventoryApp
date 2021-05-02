import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Manufacturer } from '../../../models/Manufacturer.model';

export const findOneManufacturer = async (req: Request, res: Response) => {
  const manufacturer_id = req.params.id;

  const manufacturer = await getRepository(Manufacturer).findOne(
    manufacturer_id
  );

  if (!manufacturer) throw new Error('The Brands with given ID was not Found!');

  res.json({
    manufacturer,
    success: true,
  });
};
