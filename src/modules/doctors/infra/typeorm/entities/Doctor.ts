import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
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

  @OneToOne(() => Address, { cascade: ['insert', 'soft-remove', 'recover'] })
  @JoinColumn({ name: 'address_id', referencedColumnName: 'id' })
  address: Address;

  @ManyToMany(() => Specialty)
  @JoinTable({
    name: 'doctors_specialties',
    joinColumn: { name: 'doctor_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'specialty_id', referencedColumnName: 'id' },
  })
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
