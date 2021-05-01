import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Manufacturer } from '../../../models/Manufacturer.model';

export const findOneManufacturer = async (req: Request, res: Response) => {
  const manufacturer_id = req.params.id;

  const manufacturer = await getRepository(Manufacturer).find({
    where: { id: manufacturer_id },
    order: {
      id: 'ASC',
    },
  });

  res.json({
    manufacturer: manufacturer[0],
    success: true,
  });
};
