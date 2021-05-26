import { ICreateDoctorsDTO } from '@modules/doctors/dtos/ICreateDoctorsDTO';
import { IFindDoctorsDTO } from '@modules/doctors/dtos/IFindDoctorsDTO';
import { Doctor } from '@modules/doctors/infra/typeorm/entities/Doctor';
import { IDoctorsRepository } from '@modules/doctors/repositories/IDoctorsRepository';
import { removeNullOrUndefinedProperties } from '@shared/utils/removeNullOrUndefinedProperties';
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

  public async findById(id: string): Promise<Doctor | undefined> {
    return this.ormRepository.findOne(id, { relations: ['address'] });
  }

  public async findByCRM(crm: string): Promise<Doctor | undefined> {
    return this.ormRepository.findOne({
      where: { crm },
    });
  }

  public async find({
    cep,
    street,
    neighborhood,
    city,
    state,
    specialty,
    ...data
  }: IFindDoctorsDTO): Promise<Doctor[]> {
    const parsedData = removeNullOrUndefinedProperties(data);
    const parsedAddressData = removeNullOrUndefinedProperties({
      cep,
      street,
      neighborhood,
      city,
      state,
    });

    const baseQuery = this.ormRepository
      .createQueryBuilder('doctor')
      .leftJoinAndSelect('doctor.address', 'address')
      .leftJoinAndSelect('doctor.specialties', 'specialty');

    const parsedAddressDataEntries = Object.entries(parsedAddressData);

    Object.entries(parsedData).forEach(([k, v]) => {
      Object.assign(parsedData, {
        [k]: `${v?.toLowerCase()}%`,
      });
    });

    parsedAddressDataEntries.forEach(([k, v]) => {
      Object.assign(parsedAddressData, {
        [k]: `${v?.toLowerCase()}%`,
      });
    });

    return baseQuery
      .where(
        Object.keys(parsedData)
          .map(k => `LOWER(doctor.${k}) LIKE :${k}`)
          .concat(
            Object.keys(parsedAddressData).map(
              k => `LOWER(address.${k}) LIKE :${k}`,
            ),
          )
          .join(' AND '),
        { ...parsedData, ...parsedAddressData },
      )
      .getMany();
  }

  public async softRemove(doctor: Doctor): Promise<void> {
    await this.ormRepository.softRemove(doctor);
  }

  public async save(doctor: Doctor): Promise<Doctor> {
    return this.ormRepository.save(doctor);
  }
}

export { DoctorsRepository };
