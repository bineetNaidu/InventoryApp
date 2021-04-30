import { Router } from 'express';
import { getRepository } from 'typeorm';
import { Comment as CommentModel } from '../../models/Comment.model';
import { Item as ItemModel } from '../../models/Items.model';
import { ItemType as ItemTypeModel } from '../../models/ItemTypes.model';
import { Manufacturer as ManufacturerModel } from '../../models/Manufacturer.model';
import { User as UserModel } from '../../models/User.model';
import { createUser } from './users/create';

export const Comment = getRepository(CommentModel);
export const Item = getRepository(ItemModel);
export const ItemType = getRepository(ItemTypeModel);
export const Manufacturer = getRepository(ManufacturerModel);
export const User = getRepository(UserModel);

const r = Router();

// *** Users Route ***
r.route('/v1/users').post(createUser);

r.use('/v1/brands', (req, res) => {});
r.use('/v1/comments', (req, res) => {});
r.use('/v1/items', (req, res) => {});
r.use('/v1/item_type', (req, res) => {});

export { r as v1Routes };
