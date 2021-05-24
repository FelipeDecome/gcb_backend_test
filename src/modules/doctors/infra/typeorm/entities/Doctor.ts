import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { Address } from './Address';
import { Specialty } from './Specialty';

@Entity('doctors')
class Doctor {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  crm: string;

  @Column()
  landline_phone: string;

  @Column()
  cell_phone: string;

  @Column('uuid')
  address_id: string;

  @ManyToOne(() => Address)
  address: Address;

  @ManyToMany(() => Specialty)
  @JoinColumn()
  specialties: Specialty[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  removed_at?: Date;

  constructor() {
    if (!this.id) this.id = uuid();
  }
}

export { Doctor };
