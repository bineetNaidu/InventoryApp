import { Request, Response } from 'express';
import { Manufacturers } from '../../models/Manufacturers';

export const getAllManufacturers = async (_req: Request, res: Response) => {
  const manufacturers = await Manufacturers.find();
  res.json({
    manufacturers,
    length: manufacturers.length,
    success: true,
  });
};
