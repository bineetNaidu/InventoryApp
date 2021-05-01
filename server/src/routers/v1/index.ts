import { Router } from 'express';
import { createUser } from './users/create';
import { findAllUsers } from './users/findAll';

const r = Router();

// *** Users Route ***
r.use('/v1/users', createUser);
r.get('/v1/users', findAllUsers);

r.use('/v1/brands', (req, res) => {});
r.use('/v1/comments', (req, res) => {});
r.use('/v1/items', (req, res) => {});
r.use('/v1/item_type', (req, res) => {});

export { r as v1Routes };
