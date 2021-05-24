import { ViaCepCepProvider } from '@modules/doctors/providers/CepProvider/implementations/ViaCepCepProvider';
import { CreateDoctorService } from '@modules/doctors/services/CreateDoctorService';
import { Request, Response } from 'express';

import { DoctorsRepository } from '../../typeorm/repositories/DoctorsRepository';
import { SpecialtiesRepository } from '../../typeorm/repositories/SpecialtiesRepository';

class DoctorsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, crm, landline_phone, cell_phone, cep, specialties } =
      request.body;

    const doctorsRepository = new DoctorsRepository();
    const specialtiesRepository = new SpecialtiesRepository();
    const cepProvider = new ViaCepCepProvider();

    const createDoctorService = new CreateDoctorService(
      doctorsRepository,
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
