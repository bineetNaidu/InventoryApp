import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  BeforeInsert,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { InventoryLocations } from './InventoryLocations';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar', { unique: true, length: 24 })
  username!: string;

  @Column('varchar', { unique: true, length: 60 })
  email!: string;

  @Column('text') password!: string;

  @ManyToOne(() => InventoryLocations, (il) => il.id)
  inventory_location: InventoryLocations;

  @Column('boolean', { default: false })
  is_admin?: boolean;

  @CreateDateColumn()
  created_at?: string;

  @UpdateDateColumn()
  updated_at?: string;

  @BeforeInsert()
  async hashPasswordBeforeInsert() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
