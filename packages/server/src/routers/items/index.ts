import { Router } from 'express';
import { isAuthed } from '../../middlewares/isAuthed';
import { isItemsOwner } from '../../middlewares/isOwner';
import { validateRequest } from '../../middlewares/validateRequest';
import { createItemValidation, createItem } from './create';
import { deleteItem } from './delete';
import { findAllItems } from './findAll';
import { findItem } from './findOne';
import { updateItem, updateItemValidations } from './update';

const r = Router();

r.route('/')
  .post(isAuthed, createItemValidation, validateRequest, createItem)
  .get(isAuthed, findAllItems);
r.route('/:id')
  .get(isAuthed, isItemsOwner, findItem)
  .put(
    isAuthed,
    isItemsOwner,
    updateItemValidations,
    validateRequest,
    updateItem
  )
  .delete(isAuthed, isItemsOwner, deleteItem);

export { r as itemRoutes };
