import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('comments')
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar', { length: 120 })
  body!: string;

  @Column('uuid') author_id!: string;

  @Column('uuid') item_id!: string;

  @CreateDateColumn()
  created_at?: string;

  @UpdateDateColumn()
  updated_at?: string;
}
