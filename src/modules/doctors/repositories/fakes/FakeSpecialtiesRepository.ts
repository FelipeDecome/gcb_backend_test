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

  public async findByIds(ids: string[]): Promise<Specialty[]> {
    return this.repository.filter(specialty => ids.includes(specialty.id));
  }

  public async index(): Promise<Specialty[]> {
    return [...this.repository];
  }
}

export { FakeSpecialtiesRepository };
