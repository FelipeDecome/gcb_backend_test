import { AppError } from '@shared/Errors/AppError';

import { IDoctorsRepository } from '../repositories/IDoctorsRepository';

interface IRequest {
  id: string;
}

class DeleteDoctorsService {
  constructor(private doctorsRepository: IDoctorsRepository) {}

  public async execute({ id }: IRequest): Promise<void> {
    const doctor = await this.doctorsRepository.findById(id);

    if (!doctor) throw new AppError('Doctor not found.');

    await this.doctorsRepository.softRemove(doctor);
  }
}

export { DeleteDoctorsService };
