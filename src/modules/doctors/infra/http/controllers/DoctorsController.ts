import { CreateDoctorService } from '@modules/doctors/services/CreateDoctorService';
import { DeleteDoctorsService } from '@modules/doctors/services/DeleteDoctorService';
import { FindDoctorsService } from '@modules/doctors/services/FindDoctorsService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class DoctorsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, crm, landline_phone, cell_phone, cep, specialties } =
      request.body;

    const createDoctorService = container.resolve(CreateDoctorService);

    const doctor = await createDoctorService.execute({
      name,
      crm,
      landline_phone,
      cell_phone,
      cep,
      specialties,
    });

    return response.status(201).json(doctor);
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

    const findDoctorsService = container.resolve(FindDoctorsService);

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

  public async remove(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteDoctorsService = container.resolve(DeleteDoctorsService);

    await deleteDoctorsService.execute({ id });
    return response.status(204).send();
  }
}

export { DoctorsController };
