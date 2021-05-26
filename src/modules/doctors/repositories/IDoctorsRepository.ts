import { ICreateDoctorsDTO } from '../dtos/ICreateDoctorsDTO';
import { IFindDoctorsDTO } from '../dtos/IFindDoctorsDTO';
import { Doctor } from '../infra/typeorm/entities/Doctor';

interface IDoctorsRepository {
  create(data: ICreateDoctorsDTO): Promise<Doctor>;
  findById(id: string): Promise<Doctor | undefined>;
  findByCRM(crm: string): Promise<Doctor | undefined>;
  find(opt: IFindDoctorsDTO): Promise<Doctor[]>;
  softRemove(doctor: Doctor): Promise<void>;
  save(doctor: Doctor): Promise<Doctor>;
}

export { IDoctorsRepository };
