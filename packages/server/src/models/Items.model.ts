import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

enum ItemType {
  Inventory = 'inventory',
  NonInventory = 'non-inventory',
  Service = 'service',
}
@Entity('items')
export class Item extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: number;

  @Column('varchar', { length: 50 })
  name!: string;

  @Column('integer', { default: 0 })
  price!: number;

  @Column('boolean', { default: false })
  has_warranty?: boolean;

  @Column('text') purchase_location?: string;

  @Column('varchar', { length: 200 }) info?: string;

  @Column({ type: 'enum', enum: ItemType, default: ItemType.NonInventory })
  item_type!: string;

  // ? one-to-on relations
  @Column('uuid') user_id!: string;
  @Column('uuid') manufacturer_id!: string;
}
