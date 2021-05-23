import { v4 as uuid } from 'uuid';
import { Address } from './Address';
import { Specialty } from './Specialty';

class Doctor {
  id: string;

  name: string;

  crm: string;

  landline_phone: string;

  cell_phone: string;

  address_id: string;

  address: Address;

  specialties: Specialty[];

  created_at: Date;

  updated_at: Date;

  removed_at?: Date;

  constructor() {
    if (!this.id) this.id = uuid();
  }
}

export { Doctor };
