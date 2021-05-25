import { ICreateDoctorsDTO } from '../dtos/ICreateDoctorsDTO';
import { IFindDoctorsDTO } from '../dtos/IFindDoctorsDTO';
import { Doctor } from '../infra/typeorm/entities/Doctor';

interface IDoctorsRepository {
  create(data: ICreateDoctorsDTO): Promise<Doctor>;
  findByCRM(crm: string): Promise<Doctor | undefined>;
  find(opt: IFindDoctorsDTO): Promise<Doctor[]>;
  // softRemove(): Promise<void>;
}

export { IDoctorsRepository };
