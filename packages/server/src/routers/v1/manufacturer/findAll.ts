import { Request, Response } from 'express';
import { Manufacturer } from '../../../models/Manufacturer.model';

export const findAllManufacturer = async (req: Request, res: Response) => {
  const manufacturers = await Manufacturer.find({
    order: {
      id: 'ASC',
    },
  });

  res.json({
    manufacturers,
    length: manufacturers.length,
    success: true,
  });
};
