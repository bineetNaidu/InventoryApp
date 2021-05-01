import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Manufacturer } from '../../../models/Manufacturer.model';

export const deleteOneManufacturer = async (req: Request, res: Response) => {
  const manufacturer_id = req.params.id;

  const manufacturer = await getRepository(Manufacturer).find({
    where: { id: manufacturer_id },
    order: {
      id: 'ASC',
    },
  });

  if (!manufacturer.length) {
    throw new Error('The Brand with the given ID was Not Found');
  }

  await getRepository(Manufacturer)
    .createQueryBuilder()
    .delete()
    .from(Manufacturer)
    .where('id = :id', { id: manufacturer[0].id })
    .execute();

  res.json({
    manufacturer: manufacturer[0],
    deleted_manufacturer_id: manufacturer[0].id,
    deleted: true,
    success: true,
  });
};
