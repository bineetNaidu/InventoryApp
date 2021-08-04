import { Request, Response } from 'express';
import { BadRequestError } from '../../utils/BadRequestError';
import { Manufacturers } from '../../models/Manufacturers';

export const deleteManufacturer = async (req: Request, res: Response) => {
  const { id } = req.params;

  const manufacturer = await Manufacturers.findOne({
    where: {
      id,
    },
  });

  if (!manufacturer) {
    throw new BadRequestError('Manufacturer not found');
  }

  await manufacturer.remove();

  res.json({
    deleted: true,
    deleted_manufacturer_id: manufacturer.id,
  });
};
