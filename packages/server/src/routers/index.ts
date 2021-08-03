import { Router } from 'express';
import { signup, signupValidation } from './users/create';
import { findAllUsers } from './users/findAll';
import { loginRoute, loginValidation } from './users/findOne';
import { isAuthed } from '../middlewares/isAuthed';
import { createItem, createItemValidation } from './items/create';
import { findAllItems } from './items/findAll';
import { findItem } from './items/findOne';
import { isItemsOwner } from '../middlewares/isOwner';
import { updateItem } from './items/update';
import { deleteItem } from './items/delete';
import { createComment, createCommentValidations } from './comments/create';
import { deleteComment, deleteCommentValidations } from './comments/delete';
import { validateRequest } from '../middlewares/validateRequest';
import { isAdmin } from '../middlewares/isAdmin';

const r = Router();

// *** Users Route ***
r.route('/v1/users').get(isAuthed, isAdmin, findAllUsers);
r.post('/v1/auth/signup', signupValidation, validateRequest, signup);
r.post('/v1/auth/login', loginValidation, validateRequest, loginRoute);

r.route('/v1/items')
  .post(isAuthed, createItemValidation, validateRequest, createItem)
  .get(isAuthed, findAllItems);
r.route('/v1/items/:id')
  .get(isAuthed, isItemsOwner, findItem)
  .put(isAuthed, isItemsOwner, updateItem)
  .delete(isAuthed, isItemsOwner, deleteItem);

r.route('/v1/comments/:item_id')
  .post(isAuthed, createCommentValidations, validateRequest, createComment)
  .delete(isAuthed, deleteCommentValidations, validateRequest, deleteComment);

export { r as v1Routes };
