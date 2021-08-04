import { Router } from 'express';
import { isAdmin } from '../../middlewares/isAdmin';
import { isAuthed } from '../../middlewares/isAuthed';
import { validateRequest } from '../../middlewares/validateRequest';
import { createItemType, itemTypeValidation } from './create';
import { deleteItemType } from './delete';
import { getAllItemTypes } from './findAll';
import { updateItemType } from './update';

const r = Router();

r.route('/')
  .get(isAuthed, getAllItemTypes)
  .post(isAuthed, isAdmin, itemTypeValidation, validateRequest, createItemType);

r.route('/:id')
  .put(isAuthed, isAdmin, itemTypeValidation, validateRequest, updateItemType)
  .delete(isAuthed, isAdmin, deleteItemType);

export { r as itemTypesRoutes };
