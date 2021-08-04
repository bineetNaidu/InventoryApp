import { Router } from 'express';
import { isAdmin } from '../../middlewares/isAdmin';
import { isAuthed } from '../../middlewares/isAuthed';
import { validateRequest } from '../../middlewares/validateRequest';
import { createManufacturer, manufacturerValidation } from './create';
import { deleteManufacturer } from './delete';
import { getAllManufacturers } from './findAll';
import { updateManufacturer } from './update';

const r = Router();

r.route('/')
  .get(isAuthed, getAllManufacturers)
  .post(
    isAuthed,
    isAdmin,
    manufacturerValidation,
    validateRequest,
    createManufacturer
  );

r.route('/:id')
  .put(
    isAuthed,
    isAdmin,
    manufacturerValidation,
    validateRequest,
    updateManufacturer
  )
  .delete(isAuthed, isAdmin, deleteManufacturer);

export { r as manufacturerRoutes };
