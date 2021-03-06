import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateDoctorsSpecialties1621805485825
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'doctors_specialties',
        columns: [
          {
            name: 'doctor_id',
            type: 'uuid',
          },
          {
            name: 'specialty_id',
            type: 'uuid',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['doctor_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'doctors',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            columnNames: ['specialty_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'specialties',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('doctors_specialties');
  }
}
