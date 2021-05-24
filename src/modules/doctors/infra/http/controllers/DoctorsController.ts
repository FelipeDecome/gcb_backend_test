import { FakeCepProvider } from '@modules/doctors/providers/CepProvider/fakes/FakeCepProvider';
import { CreateDoctorService } from '@modules/doctors/services/CreateDoctorService';
import { Request, Response } from 'express';

import { AddressesRepository } from '../../typeorm/repositories/AddressesRepository';
import { DoctorsRepository } from '../../typeorm/repositories/DoctorsRepository';
import { SpecialtiesRepository } from '../../typeorm/repositories/SpecialtiesRepository';

const doctorsRepository = new DoctorsRepository();
const addressRepository = new AddressesRepository();
const specialtiesRepository = new SpecialtiesRepository();
const cepProvider = new FakeCepProvider();

class DoctorsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, crm, landline_phone, cell_phone, cep, specialties } =
      request.body;

    const createDoctorService = new CreateDoctorService(
      doctorsRepository,
      addressRepository,
      specialtiesRepository,
      cepProvider,
    );

    const doctor = await createDoctorService.execute({
      name,
      crm,
      landline_phone,
      cell_phone,
      cep,
      specialties,
    });

    return response.json(doctor);
  }
}

export { DoctorsController };
