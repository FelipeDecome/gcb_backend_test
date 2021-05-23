import { ICreateAddressDTO } from '@modules/doctors/dtos/ICreateAddressDTO';
import { Address } from '@modules/doctors/infra/typeorm/entities/Address';
import { IAddressesRepository } from '../IAddressesRepository';

class FakeAddressesRepository implements IAddressesRepository {
  private repository: Address[] = [];

  public async create(data: ICreateAddressDTO): Promise<Address> {
    const address = new Address();

    Object.assign(address, data);

    this.repository.push(address);

    return address;
  }

  public async findByCep(cep: string): Promise<Address | undefined> {
    return this.repository.find(address => address.cep === cep);
  }
}

export { FakeAddressesRepository };
