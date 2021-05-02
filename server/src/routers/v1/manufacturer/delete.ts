import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Manufacturer } from '../../../models/Manufacturer.model';

export const deleteOneManufacturer = async (req: Request, res: Response) => {
  const manufacturer_id = req.params.id;

  const manufacturer = await getRepository(Manufacturer).findOne(
    manufacturer_id
  );

  if (!manufacturer) {
    throw new Error('The Brand with the given ID was Not Found');
  }

  await getRepository(Manufacturer)
    .createQueryBuilder()
    .delete()
    .from(Manufacturer)
    .where('id = :id', { id: manufacturer.id })
    .execute();

  res.json({
    manufacturer,
    deleted_manufacturer_id: manufacturer.id,
    deleted: true,
    success: true,
  });
};
