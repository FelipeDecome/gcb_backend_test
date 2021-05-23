import { Specialty } from '@modules/doctors/infra/typeorm/entities/Specialty';
import { ISpecialtiesRepository } from '../ISpecialtyRepository';

class FakeSpecialtiesRepository implements ISpecialtiesRepository {
  private repository: Specialty[];

  constructor(specialtySeeds: string[]) {
    this.repository = [];

    specialtySeeds.forEach(seed => {
      const specialty = new Specialty();

      Object.assign(specialty, {
        name: seed,
      });

      this.repository.push(specialty);
    });
  }

  public async findByNames(names: string[]): Promise<Specialty[]> {
    const specialties = [] as Specialty[];
    names.forEach(name => {
      const findSpecialty = this.repository.find(
        specialty => specialty.name === name,
      );

      if (findSpecialty) specialties.push(findSpecialty);
    });

    return specialties;
  }
}

export { FakeSpecialtiesRepository };
