import { Router } from 'express';
import { commentsRoutes } from './comments';
import { itemRoutes } from './items';
import { userRoutes } from './users';

const r = Router();

// *** Users Route ***
r.use('/auth', userRoutes);
r.use('/items', itemRoutes);
r.use('/comments', commentsRoutes);

export { r as v1Routes };
