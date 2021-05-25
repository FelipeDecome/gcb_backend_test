import { ICreateDoctorsDTO } from '@modules/doctors/dtos/ICreateDoctorsDTO';
import { IFindDoctorsDTO } from '@modules/doctors/dtos/IFindDoctorsDTO';
import { Doctor } from '@modules/doctors/infra/typeorm/entities/Doctor';
import { IDoctorsRepository } from '@modules/doctors/repositories/IDoctorsRepository';
import { getRepository, Repository } from 'typeorm';
import { removeNullOrUndefinedProperties } from 'utils/removeNullOrUndefinedProperties';

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
        [k]: `${v}%`,
      });
    });

    parsedAddressDataEntries.forEach(([k, v]) => {
      Object.assign(parsedAddressData, {
        [k]: `${v}%`,
      });
    });

    return baseQuery
      .where(
        Object.keys(parsedData)
          .map(k => `doctor.${k} LIKE :${k}`)
          .concat(
            Object.keys(parsedAddressData).map(k => `address.${k} LIKE :${k}`),
          )
          .join(' AND '),
        { ...parsedData, ...parsedAddressData },
      )

      .getMany();
  }
}

export { DoctorsRepository };
