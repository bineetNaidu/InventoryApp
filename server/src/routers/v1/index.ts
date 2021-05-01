import { Router } from 'express';
import { createUser } from './users/create';
import { findAllUsers } from './users/findAll';
import { findOneUser } from './users/findOne';
import { createManufacturer } from './manufacturer/create';
import { findAllManufacturer } from './manufacturer/findAll';
import { findOneManufacturer } from './manufacturer/findOne';

const r = Router();

// *** Users Route ***
r.use('/v1/users', createUser);
r.use('/v1/users', findOneUser);
r.get('/v1/users', findAllUsers);

// *** Brands / Manufacturer Route ***
r.route('/v1/manufacturer').post(createManufacturer);
r.get('/v1/manufacturer/all', findAllManufacturer);
r.get('/v1/manufacturer/:id', findOneManufacturer);

r.use('/v1/comments', (req, res) => {});
r.use('/v1/items', (req, res) => {});
r.use('/v1/item_type', (req, res) => {});

export { r as v1Routes };
