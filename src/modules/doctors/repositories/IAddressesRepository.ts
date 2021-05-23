import { ICreateAddressDTO } from '../dtos/ICreateAddressDTO';
import { Address } from '../infra/typeorm/entities/Address';

interface IAddressesRepository {
  create(data: ICreateAddressDTO): Promise<Address>;
  findByCep(cep: string): Promise<Address | undefined>;
}

export { IAddressesRepository };
