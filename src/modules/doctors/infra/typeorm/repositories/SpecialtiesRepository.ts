import { Specialty } from '@modules/doctors/infra/typeorm/entities/Specialty';
import { ISpecialtiesRepository } from '@modules/doctors/repositories/ISpecialtyRepository';
import { getRepository, In, Repository } from 'typeorm';

class SpecialtiesRepository implements ISpecialtiesRepository {
  private ormRepository: Repository<Specialty>;

  constructor() {
    this.ormRepository = getRepository(Specialty);
  }

  public async findByIds(ids: string[]): Promise<Specialty[]> {
    return this.ormRepository.find({
      where: { id: In(ids) },
    });
  }

  public async index(): Promise<Specialty[]> {
    return this.ormRepository.find();
  }
}

export { SpecialtiesRepository };
