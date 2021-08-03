import { Router } from 'express';
import { isAdmin } from '../../middlewares/isAdmin';
import { isAuthed } from '../../middlewares/isAuthed';
import { validateRequest } from '../../middlewares/validateRequest';
import { signupValidation, signup } from './create';
import { findAllUsers } from './findAll';
import { loginValidation, loginRoute } from './findOne';

const r = Router();

r.route('/users').get(isAuthed, isAdmin, findAllUsers);
r.post('/signup', signupValidation, validateRequest, signup);
r.post('/login', loginValidation, validateRequest, loginRoute);

export { r as userRoutes };
