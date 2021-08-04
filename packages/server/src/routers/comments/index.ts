import { Router } from 'express';
import { isAuthed } from '../../middlewares/isAuthed';
import { validateRequest } from '../../middlewares/validateRequest';
import { createCommentValidations, createComment } from './create';
import { deleteCommentValidations, deleteComment } from './delete';

const r = Router();

r.route('/:item_id')
  .post(isAuthed, createCommentValidations, validateRequest, createComment)
  .delete(isAuthed, deleteCommentValidations, validateRequest, deleteComment);

export { r as commentsRoutes };
