import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Manufacturer } from '../../../models/Manufacturer.model';

export const findAllManufacturer = async (req: Request, res: Response) => {
  const manufacturer = await getRepository(Manufacturer).find({
    order: {
      id: 'ASC',
    },
  });

  res.json({
    manufacturer,
    length: manufacturer.length,
    success: true,
  });
};
