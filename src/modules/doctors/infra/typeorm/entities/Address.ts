import { v4 as uuid } from 'uuid';

class Address {
  id: string;

  cep: string;

  street: string;

  neighborhood: string;

  city: string;

  state: string;

  created_at: Date;

  updated_at: Date;

  constructor() {
    if (!this.id) this.id = uuid();
  }
}

export { Address };
