import { Request, Response } from 'express';
import { body } from 'express-validator';
import { Manufacturers } from '../../models/Manufacturers';

export const manufacturerValidation = [
  body('name')
    .not()
    .isEmpty()
    .withMessage('Should have a name')
    .trim()
    .isLength({ min: 1, max: 80 })
    .withMessage('Should have a name between 1 and 80 characters')
    .escape(),
  body('description')
    .not()
    .isEmpty()
    .withMessage('Should have a description')
    .trim()
    .isLength({ min: 1, max: 180 })
    .withMessage('Should have a description between 1 and 180 characters')
    .escape(),
  body('logo_url')
    .not()
    .isEmpty()
    .withMessage('Should have a logo url')
    .trim()
    .isURL()
    .withMessage('Should have a valid logo url')
    .escape(),
  body('website')
    .not()
    .isEmpty()
    .withMessage('Should have a website')
    .trim()
    .isURL()
    .withMessage('Should have a valid website url')
    .escape(),
  body('contacts')
    .not()
    .isEmpty()
    .withMessage('Should have a contacts')
    .trim()
    .isLength({ min: 1, max: 80 })
    .withMessage('Should have a contacts between 1 and 80 characters')
    .escape(),
];

export const createManufacturer = async (req: Request, res: Response) => {
  const { name, description, contacts, website, logo_url } = req.body;
  const manufacturer = await Manufacturers.create({
    name,
    description,
    contacts,
    website,
    logo_url,
  }).save();

  res.status(201).json({
    manufacturer,
    created: true,
  });
};
