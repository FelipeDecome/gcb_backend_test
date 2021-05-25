import { Specialty } from '../infra/typeorm/entities/Specialty';
import { FakeDoctorsRepository } from '../repositories/fakes/FakeDoctorsRepository';
import { FakeSpecialtiesRepository } from '../repositories/fakes/FakeSpecialtiesRepository';
import { FindDoctorsService } from './FindDoctorsService';

const specialtySeeds = ['Alergologia', 'Angiologia'];

let doctorsRepository: FakeDoctorsRepository;
let findDoctorsService: FindDoctorsService;

let specialtiesRepository: FakeSpecialtiesRepository;
let specialties: Specialty[];

describe('Find Doctors', () => {
  beforeAll(async () => {
    specialtiesRepository = new FakeSpecialtiesRepository(specialtySeeds);

    specialties = await specialtiesRepository.index();
  });

  beforeEach(() => {
    doctorsRepository = new FakeDoctorsRepository();
    findDoctorsService = new FindDoctorsService(doctorsRepository);
  });

  it('Should be able to find Doctors', async () => {
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

    const findDoctors = await findDoctorsService.execute({});

    expect(findDoctors).toHaveLength(1);
  });
});
