import { AppError } from '@shared/Errors/AppError';

import { Doctor } from '../infra/typeorm/entities/Doctor';
import { FakeCepProvider } from '../providers/CepProvider/fakes/FakeCepProvider';
import { IAddressesRepository } from '../repositories/IAddressesRepository';
import { IDoctorsRepository } from '../repositories/IDoctorsRepository';
import { ISpecialtiesRepository } from '../repositories/ISpecialtyRepository';

interface IRequest {
  name: string;
  crm: string;
  landline_phone: string;
  cell_phone: string;
  cep: string;
  specialties: string[];
}

/* const viaCepResponse = await fetch(
    `https://viacep.com.br/ws/${cep}/json/`,
  ); */

class CreateDoctorService {
  constructor(
    private doctorsRepository: IDoctorsRepository,
    private addressesRepository: IAddressesRepository,
    private specialtiesRepository: ISpecialtiesRepository,
    private cepProvider: FakeCepProvider,
  ) {}

  public async execute({
    name,
    crm,
    landline_phone,
    cell_phone,
    cep,
    specialties,
  }: IRequest): Promise<Doctor> {
    const crmAlreadyInUse = await this.doctorsRepository.findByCRM(crm);

    if (crmAlreadyInUse) throw new AppError('CRM already in use');

    let address = await this.addressesRepository.findByCep(cep);

    if (!address) {
      const { cep: _, ...rest } = await this.cepProvider.find(cep);

      address = await this.addressesRepository.create({
        cep,
        ...rest,
      });
    }

    const findSpecialties = await this.specialtiesRepository.findByIds(
      specialties,
    );

    if (specialties.length < 2)
      throw new AppError('A doctor must have at least 2 specialty');

    if (findSpecialties.length < 2) {
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

    const doctor = await this.doctorsRepository.create({
      name,
      crm,
      landline_phone,
      cell_phone,
      address,
      specialties: findSpecialties,
    });

    return doctor;
  }
}

export { CreateDoctorService };
