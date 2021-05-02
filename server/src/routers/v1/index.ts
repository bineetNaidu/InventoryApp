import { Router } from 'express';
import { signup } from './users/create';
import { findAllUsers } from './users/findAll';
import { findOneUser } from './users/findOne';
import { createManufacturer } from './manufacturer/create';
import { findAllManufacturer } from './manufacturer/findAll';
import { findOneManufacturer } from './manufacturer/findOne';
import { deleteOneManufacturer } from './manufacturer/delete';
import { updateOneManufacturer } from './manufacturer/update';
import { isAuthed } from '../../middlewares/isAuthed';
import { isAdmin } from '../../middlewares/isAdmin';
import { createItem } from './items/create';
import { findAllItems } from './items/findAll';
import { findItem } from './items/findOne';
import { isItemsOwner } from '../../middlewares/isOwner';
import { updateItem } from './items/update';
import { deleteItem } from './items/delete';
import { createComment } from './comments/create';

const r = Router();

// *** Users Route ***
r.route('/v1/users').post(signup).get(findAllUsers);
r.use('/v1/users', findOneUser);

// *** Brands / Manufacturer Route ***
r.route('/v1/manufacturer')
  .post(isAuthed, isAdmin, createManufacturer)
  .get(isAuthed, findAllManufacturer);

r.route('/v1/manufacturer/:id')
  .delete(isAuthed, isAdmin, deleteOneManufacturer)
  .get(isAuthed, findOneManufacturer)
  .put(isAuthed, isAdmin, updateOneManufacturer);

r.route('/v1/items')
  .post(isAuthed, createItem)
  .get(isAuthed, isAdmin, findAllItems);
r.route('/v1/items/:id')
  .get(isAuthed, isItemsOwner, findItem)
  .put(isAuthed, isItemsOwner, updateItem)
  .delete(isAuthed, isItemsOwner, deleteItem);

r.post('/v1/comments/:item_id', isAuthed, createComment);

export { r as v1Routes };
