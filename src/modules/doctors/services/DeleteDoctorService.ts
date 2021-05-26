import { AppError } from '@shared/Errors/AppError';
import { inject, injectable } from 'tsyringe';

import { IDoctorsRepository } from '../repositories/IDoctorsRepository';

interface IRequest {
  id: string;
}

@injectable()
class DeleteDoctorsService {
  constructor(
    @inject('DoctorsRepository')
    private doctorsRepository: IDoctorsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const doctor = await this.doctorsRepository.findById(id);

    if (!doctor) throw new AppError('Doctor not found');

    await this.doctorsRepository.softRemove(doctor);
  }
}

export { DeleteDoctorsService };
