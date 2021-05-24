import { ICreateDoctorsDTO } from '@modules/doctors/dtos/ICreateDoctorsDTO';
import { Doctor } from '@modules/doctors/infra/typeorm/entities/Doctor';

import { IDoctorsRepository } from '../IDoctorsRepository';

class FakeDoctorsRepository implements IDoctorsRepository {
  private repository: Doctor[] = [];

  public async create(data: ICreateDoctorsDTO): Promise<Doctor> {
    const doctor = new Doctor();

    Object.assign(doctor, data);

    this.repository.push(doctor);

    return doctor;
  }

  public async findByCRM(crm: string): Promise<Doctor | undefined> {
    return this.repository.find(doctor => doctor.crm === crm);
  }
}

export { FakeDoctorsRepository };
