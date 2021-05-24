import { Request, Response } from 'express';

import { SpecialtiesRepository } from '../../typeorm/repositories/SpecialtiesRepository';

class SpecialtiesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const specialtiesRepository = new SpecialtiesRepository();

    const specialties = await specialtiesRepository.index();

    return response.json(specialties);
  }
}

export { SpecialtiesController };
