import {MigrationInterface, QueryRunner, Table, TableForeignKey} from 'typeorm';

export class CreateAccessesTable1574633211670 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.createTable(new Table({
        name: 'accesses',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isNullable: false,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'link_id',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'referrer_url',
            type: 'varchar',
            length: '2000',
          },
          {
            name: 'user_agent',
            type: 'varchar',
            length: '2000',
          },
        ],
      }));

      await queryRunner.createForeignKey('accesses', new TableForeignKey({
        columnNames: ['link_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'links',
        onDelete: 'RESTRICT',
      }));
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.dropTable('accesses');
    }

}
