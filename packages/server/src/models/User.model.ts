import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: number;

  @Column('varchar', { unique: true, length: 24 })
  username!: string;

  @Column('varchar', { unique: true, length: 60 })
  email!: string;

  @Column('text') password!: string;

  @Column('varchar') country!: string;

  @Column('varchar') state?: string;

  @Column('varchar', { length: 100 }) inventory_location?: string;

  @CreateDateColumn({ type: 'date', default: Date.now() })
  date_of_birth?: Date;

  @Column('boolean', { default: false })
  is_admin?: boolean;

  @BeforeInsert()
  async hashPasswordBeforeInsert() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
