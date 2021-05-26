import { ICreateDoctorsDTO } from '@modules/doctors/dtos/ICreateDoctorsDTO';
import { IFindDoctorsDTO } from '@modules/doctors/dtos/IFindDoctorsDTO';
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

  public async findById(id: string): Promise<Doctor | undefined> {
    return this.repository.find(doctor => doctor.id === id);
  }

  public async findByCRM(crm: string): Promise<Doctor | undefined> {
    return this.repository.find(doctor => doctor.crm === crm);
  }

  public async find(_: IFindDoctorsDTO): Promise<Doctor[]> {
    return [...this.repository];
  }

  public async softRemove(doctor: Doctor): Promise<void> {
    const findIndex = this.repository.findIndex(
      findDoctor => findDoctor.id === doctor.id,
    );

    this.repository[findIndex].removed_at = new Date();
  }

  public async save(doctor: Doctor): Promise<Doctor> {
    const findIndex = this.repository.findIndex(
      findDoctor => findDoctor.id === doctor.id,
    );

    this.repository[findIndex] = doctor;

    return doctor;
  }
}

export { FakeDoctorsRepository };
