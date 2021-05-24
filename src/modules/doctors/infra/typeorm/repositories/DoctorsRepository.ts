import { ICreateDoctorsDTO } from '@modules/doctors/dtos/ICreateDoctorsDTO';
import { Doctor } from '@modules/doctors/infra/typeorm/entities/Doctor';
import { IDoctorsRepository } from '@modules/doctors/repositories/IDoctorsRepository';
import { getRepository, Repository } from 'typeorm';

class DoctorsRepository implements IDoctorsRepository {
  private ormRepository: Repository<Doctor>;

  constructor() {
    this.ormRepository = getRepository(Doctor);
  }

  public async create(data: ICreateDoctorsDTO): Promise<Doctor> {
    const doctor = this.ormRepository.create(data);

    return this.ormRepository.save(doctor);
  }

  public async findByCRM(crm: string): Promise<Doctor | undefined> {
    return this.ormRepository.findOne({
      where: { crm },
    });
  }
}

export { DoctorsRepository };
