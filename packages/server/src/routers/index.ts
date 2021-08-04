import { Router } from 'express';
import { commentsRoutes } from './comments';
import { inventoryLocationsRoutes } from './inventoryLocations';
import { itemRoutes } from './items';
import { itemTypesRoutes } from './itemTypes';
import { manufacturerRoutes } from './manufacturers';
import { userRoutes } from './users';

const r = Router();

// *** Users Route ***
r.use('/auth', userRoutes);
r.use('/items', itemRoutes);
r.use('/comments', commentsRoutes);
r.use('/inventory_location', inventoryLocationsRoutes);
r.use('/manufacturers', manufacturerRoutes);
r.use('/item_types', itemTypesRoutes);

export { r as v1Routes };
