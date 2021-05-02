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

const r = Router();

// *** Users Route ***
r.route('/v1/users').post(signup).get(findAllUsers);
r.use('/v1/users', findOneUser);

// *** Brands / Manufacturer Route ***
r.route('/v1/manufacturer')
  .post(isAuthed, createManufacturer)
  .get(isAuthed, findAllManufacturer);
r.route('/v1/manufacturer/:id')
  .delete(isAuthed, deleteOneManufacturer)
  .get(isAuthed, findOneManufacturer)
  .put(isAuthed, updateOneManufacturer);

r.use('/v1/comments', (req, res) => {});
r.use('/v1/items', (req, res) => {});

export { r as v1Routes };
