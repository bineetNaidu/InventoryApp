import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
} from 'typeorm';

@Entity('comments')
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: number;

  @Column('varchar', { length: 80 })
  comment!: string;

  @CreateDateColumn({ type: 'date', default: Date.now() })
  commented_at?: Date;

  @Column('uuid') author_id!: string;

  @Column('uuid') item_id!: string;
}
