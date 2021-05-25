import { ViaCepCepProvider } from '@modules/doctors/providers/CepProvider/implementations/ViaCepCepProvider';
import { CreateDoctorService } from '@modules/doctors/services/CreateDoctorService';
import { FindDoctorsService } from '@modules/doctors/services/FindDoctorsService';
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

  public async find(request: Request, response: Response): Promise<Response> {
    const {
      name,
      crm,
      landline_phone,
      cell_phone,
      cep,
      street,
      neighborhood,
      city,
      state,
      specialty,
    } = request.query as Record<string, string | undefined>;

    const doctorsRepository = new DoctorsRepository();
    const findDoctorsService = new FindDoctorsService(doctorsRepository);

    const doctors = await findDoctorsService.execute({
      name,
      crm,
      landline_phone,
      cell_phone,
      cep,
      street,
      neighborhood,
      city,
      state,
      specialty,
    });

    return response.json(doctors);
  }
}

export { DoctorsController };
