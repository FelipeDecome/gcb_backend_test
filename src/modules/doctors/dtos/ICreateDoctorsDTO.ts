import { Specialty } from '../infra/typeorm/entities/Specialty';

interface IAddress {
  cep: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
}

interface ICreateDoctorsDTO {
  name: string;
  crm: string;
  landline_phone: string;
  cell_phone: string;
  address: IAddress;
  specialties: Specialty[];
}

export { ICreateDoctorsDTO };
