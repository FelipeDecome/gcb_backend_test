import '@modules/doctors/providers';

import { container } from 'tsyringe';

import { DoctorsRepository } from '../infra/typeorm/repositories/DoctorsRepository';
import { SpecialtiesRepository } from '../infra/typeorm/repositories/SpecialtiesRepository';
import { IDoctorsRepository } from '../repositories/IDoctorsRepository';
import { ISpecialtiesRepository } from '../repositories/ISpecialtyRepository';

container.registerSingleton<IDoctorsRepository>(
  'DoctorsRepository',
  DoctorsRepository,
);

container.registerSingleton<ISpecialtiesRepository>(
  'SpecialtiesRepository',
  SpecialtiesRepository,
);
