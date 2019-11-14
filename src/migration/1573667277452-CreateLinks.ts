import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateLinks1573667277452 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.query(`
        CREATE TABLE links (
          id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
          url VARCHAR(2000) NOT NULL,
          code CHAR(6) NOT NULL UNIQUE
        )
      `)
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.query(`DROP TABLE links`)
    }

}
