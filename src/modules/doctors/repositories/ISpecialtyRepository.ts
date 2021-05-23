import { Specialty } from '../infra/typeorm/entities/Specialty';

interface ISpecialtiesRepository {
  findByNames(names: string[]): Promise<Specialty[]>;
}

export { ISpecialtiesRepository };
