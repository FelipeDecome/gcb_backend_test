import { Specialty } from '@modules/doctors/infra/typeorm/entities/Specialty';
import { In, MigrationInterface, QueryRunner } from 'typeorm';

const specialtiesToSeed = [
  'Alergologia',
  'Angiologia',
  'Buco maxilo',
  'Cardiologia clínca',
  'Cardiologia infantil',
  'Cirurgia cabeça e pescoço',
  'Cirurgia cardíaca',
  'Cirurgia de tórax',
];

export default class CreateSpecialtiesSeed1621816537422
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const parsedSpecialties = specialtiesToSeed.map(specialtiesName => ({
      name: specialtiesName,
    }));

    const specialties = queryRunner.manager.create(
      Specialty,
      parsedSpecialties,
    );

    await queryRunner.manager.save(specialties);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connection
      .getRepository(Specialty)
      .delete({ name: In(specialtiesToSeed) });
  }
}
