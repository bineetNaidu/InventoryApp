import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('manufacturers')
export class Manufacturers extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar', { length: 80 }) name!: string;

  @Column('varchar', { length: 180 }) description!: string;

  @Column('varchar', { length: 100 }) contacts!: string;

  @Column('varchar', { length: 80 }) website!: string;

  @Column('varchar', { length: 280 }) logo_url!: string;

  @CreateDateColumn()
  created_at?: string;

  @UpdateDateColumn()
  updated_at?: string;
}
