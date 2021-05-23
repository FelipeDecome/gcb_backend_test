import { ICreateDoctorsDTO } from '../dtos/ICreateDoctorsDTO';
import { Doctor } from '../infra/typeorm/entities/Doctor';

interface IDoctorsRepository {
  create(data: ICreateDoctorsDTO): Promise<Doctor>;
  findByCRM(crm: string): Promise<Doctor | undefined>;
  // softRemove(): Promise<void>;
}

export { IDoctorsRepository };
