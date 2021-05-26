import { AppError } from '@shared/Errors/AppError';

import { Specialty } from '../infra/typeorm/entities/Specialty';
import { FakeCepProvider } from '../providers/CepProvider/fakes/FakeCepProvider';
import { FakeDoctorsRepository } from '../repositories/fakes/FakeDoctorsRepository';
import { FakeSpecialtiesRepository } from '../repositories/fakes/FakeSpecialtiesRepository';
import { UpdateDoctorService } from './UpdateDoctorService';

const specialtySeeds = ['Alergologia', 'Angiologia', 'Buco maxilo'];
let specialties: Specialty[];

let specialtiesRepository: FakeSpecialtiesRepository;
let doctorsRepository: FakeDoctorsRepository;
let cepProvider: FakeCepProvider;
let updateDoctorService: UpdateDoctorService;

describe('Update Doctor', () => {
  beforeAll(async () => {
    specialtiesRepository = new FakeSpecialtiesRepository(specialtySeeds);

    specialties = await specialtiesRepository.index();
  });

  beforeEach(() => {
    doctorsRepository = new FakeDoctorsRepository();
    cepProvider = new FakeCepProvider();
    updateDoctorService = new UpdateDoctorService(
      doctorsRepository,
      specialtiesRepository,
      cepProvider,
    );
  });

  it('Should be able to update doctor info', async () => {
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
      specialties: [specialties[0], specialties[1]],
    });

    const updatedInfo = {
      name: 'Juquinha',
      crm: '76.543.21',
      landline_phone: '(19)9999-9999',
      cell_phone: '(18) 98888-8888',
      cep: '76543-21',
      specialties: specialties.map(specialty => specialty.id),
    };

    const updatedDoctor = await updateDoctorService.execute({
      id: doctor.id,
      ...updatedInfo,
    });

    expect(updatedDoctor.name).toEqual(updatedInfo.name);
    expect(updatedDoctor.crm).toEqual(updatedInfo.crm);
    expect(updatedDoctor.landline_phone).toEqual(updatedInfo.landline_phone);
    expect(updatedDoctor.cell_phone).toEqual(updatedInfo.cell_phone);
    expect(updatedDoctor.address.cep).toEqual(updatedInfo.cep);
    expect(updatedDoctor.specialties).toHaveLength(3);
  });

  it('Should be able to update Doctor partially', async () => {
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
      specialties: [specialties[0], specialties[1]],
    });

    const updatedInfo = {
      name: 'Juquinha',
      crm: '76.543.21',
      landline_phone: '(19)9999-9999',
      cell_phone: '(18) 98888-8888',
      cep: '76543-21',
      specialties: specialties.map(specialty => specialty.id),
    };

    const updatedDoctor = await updateDoctorService.execute({
      id: doctor.id,
      name: updatedInfo.name,
      crm: doctor.crm,
      landline_phone: doctor.landline_phone,
      cell_phone: doctor.cell_phone,
      cep: doctor.address.cep,
      specialties: [specialties[0].id, specialties[1].id],
    });

    expect(updatedDoctor.name).toEqual(updatedInfo.name);
    expect(updatedDoctor.crm).toEqual(doctor.crm);
  });

  it('Should fail if doctor does not exists', async () => {
    await expect(
      updateDoctorService.execute({
        id: 'inexistent_id',
        name: '',
        crm: '',
        cell_phone: '',
        landline_phone: '',
        cep: '',
        specialties: [],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should fail if CRM is already in use', async () => {
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
      specialties: [specialties[0], specialties[1]],
    });

    const doctor2 = await doctorsRepository.create({
      name: 'Drauzio Varéla',
      crm: '13.456.78',
      landline_phone: '(12)3456-7590',
      cell_phone: '(12)93456-7590',
      address,
      specialties: [specialties[0], specialties[1]],
    });

    await expect(
      updateDoctorService.execute({
        id: doctor.id,
        name: doctor.name,
        crm: doctor2.crm,
        landline_phone: doctor.landline_phone,
        cell_phone: doctor.cell_phone,
        cep: doctor.address.cep,
        specialties: [specialties[0].id, specialties[1].id],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should fail if specialty does not exists', async () => {
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
      specialties: [specialties[0], specialties[1]],
    });

    await expect(
      updateDoctorService.execute({
        id: doctor.id,
        name: doctor.name,
        crm: doctor.crm,
        landline_phone: doctor.landline_phone,
        cell_phone: doctor.cell_phone,
        cep: doctor.address.cep,
        specialties: ['inexistent_id', specialties[1].id],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
