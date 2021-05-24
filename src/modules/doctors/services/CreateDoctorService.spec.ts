import { AppError } from '@shared/Errors/AppError';

import { Specialty } from '../infra/typeorm/entities/Specialty';
import { FakeCepProvider } from '../providers/CepProvider/fakes/FakeCepProvider';
import { FakeDoctorsRepository } from '../repositories/fakes/FakeDoctorsRepository';
import { FakeSpecialtiesRepository } from '../repositories/fakes/FakeSpecialtiesRepository';
import { CreateDoctorService } from './CreateDoctorService';

const specialtySeeds = ['Alergologia', 'Angiologia'];

let doctorsRepository: FakeDoctorsRepository;
let cepProvider: FakeCepProvider;
let specialtiesRepository: FakeSpecialtiesRepository;

let createDoctorService: CreateDoctorService;

let specialties: Specialty[];

describe('Create Doctor', () => {
  beforeAll(async () => {
    specialtiesRepository = new FakeSpecialtiesRepository(specialtySeeds);

    specialties = await specialtiesRepository.index();
  });

  beforeEach(() => {
    doctorsRepository = new FakeDoctorsRepository();
    cepProvider = new FakeCepProvider();

    createDoctorService = new CreateDoctorService(
      doctorsRepository,
      specialtiesRepository,
      cepProvider,
    );
  });

  it('Should be able to create a new doctor', async () => {
    const doctor = await createDoctorService.execute({
      name: 'Drauzio Varéla',
      crm: '12.345.67',
      landline_phone: '(12)3456-7590',
      cell_phone: '(12)93456-7590',
      cep: '12345-67',
      specialties: [specialties[0].id, specialties[1].id],
    });

    expect(doctor).toHaveProperty('id');
    expect(doctor.address.cep).toEqual('12345-67');
    expect(doctor.specialties).toHaveLength(2);
  });

  it('Should fail if CRM is already in use', async () => {
    const address = {
      cep: '12345-67',
      city: 'city',
      neighborhood: 'neighborhood',
      state: 'ST',
      street: 'street',
    };

    await doctorsRepository.create({
      name: 'Drauzio Varéla',
      crm: '12.345.67',
      landline_phone: '(12)3456-7590',
      cell_phone: '(12)93456-7590',
      address,
      specialties,
    });

    await expect(
      createDoctorService.execute({
        name: 'Drauzio Varéla Junior',
        crm: '12.345.67',
        landline_phone: '(12)3456-7590',
        cell_phone: '(12)93456-7590',
        cep: '12345-67',
        specialties: [specialties[0].id, specialties[1].id],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should fail if specialty does not exist', async () => {
    await expect(
      createDoctorService.execute({
        name: 'Drauzio Varéla Junior',
        crm: '12.345.67',
        landline_phone: '(12)3456-7590',
        cell_phone: '(12)93456-7590',
        cep: '12345-67',
        specialties: ['non-existent-specialty', 'non-existent-specialty2'],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should fail if less than 2 specialties were provided', async () => {
    await expect(
      createDoctorService.execute({
        name: 'Drauzio Varéla Junior',
        crm: '12.345.67',
        landline_phone: '(12)3456-7590',
        cell_phone: '(12)93456-7590',
        cep: '12345-67',
        specialties: [specialties[1].id],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
