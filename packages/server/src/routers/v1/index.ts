import { Router } from 'express';
import { signup } from './users/create';
import { findAllUsers } from './users/findAll';
import { loginRoute } from './users/findOne';
import { isAuthed } from '../../middlewares/isAuthed';
import { createItem } from './items/create';
import { findAllItems } from './items/findAll';
import { findItem } from './items/findOne';
import { isItemsOwner } from '../../middlewares/isOwner';
import { updateItem } from './items/update';
import { deleteItem } from './items/delete';
import { createComment } from './comments/create';
import { deleteComment } from './comments/delete';

const r = Router();

// *** Users Route ***
r.route('/v1/users').get(findAllUsers);
r.post('/v1/auth/signup', signup);
r.use('/v1/auth', loginRoute);

r.route('/v1/items').post(isAuthed, createItem).get(isAuthed, findAllItems);
r.route('/v1/items/:id')
  .get(isAuthed, isItemsOwner, findItem)
  .put(isAuthed, isItemsOwner, updateItem)
  .delete(isAuthed, isItemsOwner, deleteItem);

r.route('/v1/comments/:item_id')
  .post(isAuthed, createComment)
  .delete(isAuthed, deleteComment);

export { r as v1Routes };
