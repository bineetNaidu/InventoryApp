import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity('manufacturers')
export class Manufacturer extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: number;

  @Column('varchar', { length: 50 })
  brand_name!: string;

  @Column('varchar', { length: 50 })
  brand_type!: string;
}
