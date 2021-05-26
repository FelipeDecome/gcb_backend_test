import { AppError } from '@shared/Errors/AppError';

import { Specialty } from '../infra/typeorm/entities/Specialty';
import { FakeDoctorsRepository } from '../repositories/fakes/FakeDoctorsRepository';
import { FakeSpecialtiesRepository } from '../repositories/fakes/FakeSpecialtiesRepository';
import { DeleteDoctorsService } from './DeleteDoctorService';

const specialtySeeds = ['Alergologia', 'Angiologia'];

let doctorsRepository: FakeDoctorsRepository;
let deleteDoctorsService: DeleteDoctorsService;

let specialtiesRepository: FakeSpecialtiesRepository;
let specialties: Specialty[];

describe('Delete Doctor', () => {
  beforeAll(async () => {
    specialtiesRepository = new FakeSpecialtiesRepository(specialtySeeds);

    specialties = await specialtiesRepository.index();
  });

  beforeEach(() => {
    doctorsRepository = new FakeDoctorsRepository();
    deleteDoctorsService = new DeleteDoctorsService(doctorsRepository);
  });

  it('Should be able to delete a Doctor', async () => {
    const address = {
      cep: '12345-67',
      city: 'city',
      neighborhood: 'neighborhood',
      state: 'ST',
      street: 'street',
    };

    const doctor = await doctorsRepository.create({
      name: 'Drauzio Varéla',
      crm: '12.345.67',
      landline_phone: '(12)3456-7590',
      cell_phone: '(12)93456-7590',
      address,
      specialties,
    });

    await expect(
      deleteDoctorsService.execute({
        id: doctor.id,
      }),
    ).resolves;

    const findDoctor = await doctorsRepository.findById(doctor.id);

    expect(findDoctor?.removed_at).not.toBeUndefined();
  });

  it('Should fail if doctor does not exists', async () => {
    await expect(
      deleteDoctorsService.execute({
        id: 'invalid_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
