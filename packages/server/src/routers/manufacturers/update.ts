import { Request, Response } from 'express';
import { BadRequestError } from '../../utils/BadRequestError';
import { Manufacturers } from '../../models/Manufacturers';

export const updateManufacturer = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, contacts, website, logo_url } = req.body;

  const manufacturer = await Manufacturers.findOne({
    where: { id },
  });

  if (!manufacturer) {
    throw new BadRequestError('Manufacturer not found');
  }

  manufacturer.name = name;
  manufacturer.description = description;
  manufacturer.contacts = contacts;
  manufacturer.website = website;
  manufacturer.logo_url = logo_url;

  const updatedData = await manufacturer.save();

  res.json({
    manufacturer: updatedData,
    updated: true,
  });
};
