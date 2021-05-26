import { inject, injectable } from 'tsyringe';

import { Doctor } from '../infra/typeorm/entities/Doctor';
import { IDoctorsRepository } from '../repositories/IDoctorsRepository';

interface IRequest {
  name?: string;
  crm?: string;
  landline_phone?: string;
  cell_phone?: string;
  specialty?: string;
  cep?: string;
  street?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
}

@injectable()
class FindDoctorsService {
  constructor(
    @inject('DoctorsRepository')
    private doctorsRepository: IDoctorsRepository,
  ) {}

  public async execute(data: IRequest): Promise<Doctor[]> {
    return this.doctorsRepository.find(data);
  }
}

export { FindDoctorsService };
