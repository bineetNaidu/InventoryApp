import { Response, Request } from 'express';
import { body } from 'express-validator';
import { InventoryLocations } from '../../models/InventoryLocations';
import { BadRequestError } from '../../utils/BadRequestError';
import { User } from '../../models/Users';
import { createJWT } from '../../utils/jwtUtils';

export const signupValidation = [
  body('email').isEmail().normalizeEmail(),
  body('username')
    .not()
    .isEmpty()
    .withMessage('Please provide a username')
    .trim()
    .escape(),
  body('password')
    .not()
    .isEmpty()
    .withMessage('Please provide a password')
    .trim()
    .escape(),
  body('inventory_location_id')
    .not()
    .isEmpty()
    .withMessage('Please provide a inventory_location_id')
    .not()
    .isString()
    .withMessage('inventory_location_id has to be a number')
    .trim()
    .escape(),
];

export const signup = async (req: Request, res: Response) => {
  const { username, email, password, inventory_location_id } = req.body;

  const inventory_location = await InventoryLocations.findOne({
    id: inventory_location_id,
  });

  if (!inventory_location) {
    throw new BadRequestError('Inventory Was not Found');
  }

  const user = await User.create({
    username,
    email,
    password,
    inventory_location,
    is_admin: false,
  }).save();

  const token = await createJWT(user.id, user.email, user.is_admin || false);

  res.json({
    user,
    token,
    success: true,
    status: req.statusCode,
    message: req.statusMessage,
  });
};
