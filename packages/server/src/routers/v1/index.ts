import { Router } from 'express';
import { signup } from './users/create';
import { findAllUsers } from './users/findAll';
import { findOneUser } from './users/findOne';
import { isAuthed } from '../../middlewares/isAuthed';
import { isAdmin } from '../../middlewares/isAdmin';
import { createItem } from './items/create';
import { findAllItems } from './items/findAll';
import { findItem } from './items/findOne';
import { isItemsOwner } from '../../middlewares/isOwner';
import { updateItem } from './items/update';
import { deleteItem } from './items/delete';
import { createComment } from './comments/create';
import { deleteComment } from './comments/delete';
import { myItems } from './myItems';

const r = Router();

// *** my items route ***
r.route('/v1/my-items').get(isAuthed, myItems);

// *** Users Route ***
r.route('/v1/users').post(signup).get(findAllUsers);
r.use('/v1/users', isAuthed, isAdmin, findOneUser);

r.route('/v1/items')
  .post(isAuthed, createItem)
  .get(isAuthed, isAdmin, findAllItems);
r.route('/v1/items/:id')
  .get(isAuthed, isItemsOwner, findItem)
  .put(isAuthed, isItemsOwner, updateItem)
  .delete(isAuthed, isItemsOwner, deleteItem);

r.route('/v1/comments/:item_id')
  .post(isAuthed, createComment)
  .delete(isAuthed, deleteComment);

export { r as v1Routes };
