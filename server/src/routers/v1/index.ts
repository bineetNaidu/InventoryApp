import { Router } from 'express';

const r = Router();

r.use('/v1/users', (req, res) => {});
r.use('/v1/brands', (req, res) => {});
r.use('/v1/comments', (req, res) => {});
r.use('/v1/items', (req, res) => {});
r.use('/v1/item_type', (req, res) => {});

export { r as v1Routes };
