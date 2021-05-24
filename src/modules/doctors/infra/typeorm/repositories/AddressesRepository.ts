import { ICreateAddressDTO } from '@modules/doctors/dtos/ICreateAddressDTO';
import { Address } from '@modules/doctors/infra/typeorm/entities/Address';
import { IAddressesRepository } from '@modules/doctors/repositories/IAddressesRepository';
import { getRepository, Repository } from 'typeorm';

class AddressesRepository implements IAddressesRepository {
  private ormRepository: Repository<Address>;

  constructor() {
    this.ormRepository = getRepository(Address);
  }

  public async create(data: ICreateAddressDTO): Promise<Address> {
    const address = this.ormRepository.create(data);

    return this.ormRepository.save(address);
  }

  public async findByCep(cep: string): Promise<Address | undefined> {
    return this.ormRepository.findOne({
      where: { cep },
    });
  }
}

export { AddressesRepository };
