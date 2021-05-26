import { AppError } from '@shared/Errors/AppError';
import { removeNullOrUndefinedProperties } from '@shared/utils/removeNullOrUndefinedProperties';
import { inject, injectable } from 'tsyringe';

import { Doctor } from '../infra/typeorm/entities/Doctor';
import { Specialty } from '../infra/typeorm/entities/Specialty';
import { ICepProvider } from '../providers/CepProvider/models/ICepProvider';
import { IDoctorsRepository } from '../repositories/IDoctorsRepository';
import { ISpecialtiesRepository } from '../repositories/ISpecialtyRepository';

interface IRequest {
  id: string;
  name: string;
  crm: string;
  landline_phone: string;
  cell_phone: string;
  specialties: string[];
  cep: string;
}

@injectable()
class UpdateDoctorService {
  constructor(
    @inject('DoctorsRepository')
    private doctorsRepository: IDoctorsRepository,

    @inject('SpecialtiesRepository')
    private specialtiesRepository: ISpecialtiesRepository,

    @inject('CepProvider')
    private cepProvider: ICepProvider,
  ) {}

  public async execute({
    id,
    cep,
    specialties,
    ...rest
  }: IRequest): Promise<Doctor> {
    const doctor = await this.doctorsRepository.findById(id);

    if (!doctor) throw new AppError('Doctor not found');

    if (rest.crm && rest.crm !== doctor.crm) {
      const crmAlreadyInUse = await this.doctorsRepository.findByCRM(rest.crm);

      if (crmAlreadyInUse) throw new AppError('CRM already in use');
    }

    let findSpecialties: Specialty[] = [];

    if (specialties) {
      findSpecialties = await this.specialtiesRepository.findByIds(specialties);

      if (findSpecialties.length !== specialties.length) {
        const specialtiesNotFound: string[] = [];

        specialties.forEach(specialtyId => {
          const findId = findSpecialties.find(
            specialty => specialty.id === specialtyId,
          );

          if (!findId) specialtiesNotFound.push(specialtyId);
        });

        if (specialtiesNotFound.length > 0)
          throw new AppError(
            `Specialties ids not found: '${specialtiesNotFound.join(', ')}'`,
          );
      }
    }

    const { address } = doctor;

    if (cep && cep !== doctor.address.cep) {
      const cepProviderResponse = await this.cepProvider.find(cep);
      Object.assign(address, cepProviderResponse);
    }

    Object.assign(doctor, {
      ...removeNullOrUndefinedProperties(rest),
      specialties:
        findSpecialties.length > 0 ? findSpecialties : doctor.specialties,
      address,
    });

    return this.doctorsRepository.save(doctor);
  }
}

export { UpdateDoctorService };
