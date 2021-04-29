import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity('item_types')
export class ItemType extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: number;

  @Column('varchar', { unique: true, length: 50 })
  item_type_name!: string;
}
