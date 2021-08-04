import { Router } from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { isAdmin } from '../../middlewares/isAdmin';
import { isAuthed } from '../../middlewares/isAuthed';
import {
  createInventoryLocation,
  createInventoryLocationValidations,
} from './create';
import { getInventoryLocations } from './findAll';
import {
  updateInventoryLocation,
  updateInventoryLocationValidations,
} from './update';
import {
  deleteInventoryLocation,
  deleteInventoryLocationValidations,
} from './delete';

const r = Router();

r.route('/')
  .post(
    isAuthed,
    isAdmin,
    createInventoryLocationValidations,
    validateRequest,
    createInventoryLocation
  )
  .get(isAuthed, getInventoryLocations);

r.route('/:id')
  .put(
    isAuthed,
    isAdmin,
    updateInventoryLocationValidations,
    validateRequest,
    updateInventoryLocation
  )
  .delete(
    isAuthed,
    isAdmin,
    deleteInventoryLocationValidations,
    validateRequest,
    deleteInventoryLocation
  );

export { r as inventoryLocationsRoutes };
