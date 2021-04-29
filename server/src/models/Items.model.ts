import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

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

  // ? one-to-on relations
  @Column('uuid') userId!: string;
  @Column('uuid') manufacturer_id!: string;
  @Column('uuid') item_type_id!: string;
}
