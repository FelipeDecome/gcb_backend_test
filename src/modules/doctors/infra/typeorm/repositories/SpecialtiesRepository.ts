import { Specialty } from '@modules/doctors/infra/typeorm/entities/Specialty';
import { ISpecialtiesRepository } from '@modules/doctors/repositories/ISpecialtyRepository';
import { getRepository, In, Repository } from 'typeorm';

class SpecialtiesRepository implements ISpecialtiesRepository {
  private ormRepository: Repository<Specialty>;

  constructor() {
    this.ormRepository = getRepository(Specialty);
  }

  public async findByNames(names: string[]): Promise<Specialty[]> {
    return this.ormRepository.find({
      where: In(names),
    });
  }
}

export { SpecialtiesRepository };
