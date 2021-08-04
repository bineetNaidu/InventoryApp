import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('item_types')
export class ItemTypes extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar', { length: 80 }) name!: string;

  @CreateDateColumn()
  created_at?: string;

  @UpdateDateColumn()
  updated_at?: string;
}
