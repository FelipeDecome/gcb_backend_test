import { Specialty } from '../infra/typeorm/entities/Specialty';

interface ISpecialtiesRepository {
  findByIds(ids: string[]): Promise<Specialty[]>;
  index(): Promise<Specialty[]>;
}

export { ISpecialtiesRepository };
