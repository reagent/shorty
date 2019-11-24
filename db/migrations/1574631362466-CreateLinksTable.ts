import {MigrationInterface, QueryRunner, Table} from 'typeorm';
import { isGenericTypeAnnotation } from '@babel/types';

export class CreateLinksTable1574631362466 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(new Table({
      name: 'links',
      columns: [
        {
          name: 'id',
          type: 'INTEGER',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
          isNullable: false,
        },
        {
          name: 'url',
          type: 'varchar',
          length: '2000',
          isNullable: false,
        },
        {
          name: 'url_hash',
          type: 'char',
          length: '32',
          isNullable: false,
          isUnique: true,
        },
        {
          name: 'code',
          type: 'char',
          length: '6',
          isNullable: false,
          isUnique: true,
        },
        {
          name: 'created_at',
          type: 'timestamp',
          isNullable: false,
          default: 'CURRENT_TIMESTAMP',
        },
      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('links');
  }
}
