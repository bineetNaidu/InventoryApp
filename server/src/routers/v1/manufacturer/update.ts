import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Manufacturer } from '../../../models/Manufacturer.model';

export const updateOneManufacturer = async (req: Request, res: Response) => {
  const manufacturer_id = req.params.id;
  const { brand_name, brand_type } = req.body;

  const manufacturer = await getRepository(Manufacturer).find({
    where: { id: manufacturer_id },
    order: {
      id: 'ASC',
    },
  });

  if (!manufacturer.length) {
    throw new Error('The Brand with the given ID was Not Found');
  }

  const updatedManufacturer = await getRepository(Manufacturer)
    .createQueryBuilder()
    .update(Manufacturer)
    .set({ brand_name, brand_type })
    .where('id = :id', { id: manufacturer[0].id })
    .execute();

  // console.log(updatedManufacturer.raw);

  res.json({
    manufacturer: manufacturer[0], // ! FIX THIS! (it show backdated data)
    updated_manufacturer_id: manufacturer[0].id,
    updated: true,
    success: true,
  });
};
