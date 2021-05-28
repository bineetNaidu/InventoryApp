import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
} from 'typeorm';

@Entity('comment')
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: number;

  @Column('varchar', { length: 80 })
  comment!: string;

  @CreateDateColumn()
  commented_at?: Date;

  @Column('uuid') author_id!: string;

  @Column('uuid') item_id!: string;
}
