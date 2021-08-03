import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { ItemTypes } from './ItemTypes';
import { Manufacturers } from './Manufacturers';
import { User } from './Users';

@Entity('items')
export class Item extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar', { length: 180 })
  name!: string;

  @Column('varchar', { length: 300 }) info!: string;

  @Column('integer') price!: number;

  @Column('text') sku?: string;

  @Column('datetime') expiration_date!: string;

  @Column('varchar', { length: 200 }) purchase_location?: string;

  @ManyToOne(() => ItemTypes, (it) => it.id)
  item_type!: ItemTypes;

  @ManyToOne(() => User, (u) => u.id) user!: User;

  @ManyToOne(() => Manufacturers, (m) => m.id) manufacturer!: Manufacturers;

  @CreateDateColumn()
  created_at?: string;

  @UpdateDateColumn()
  updated_at?: string;
}
