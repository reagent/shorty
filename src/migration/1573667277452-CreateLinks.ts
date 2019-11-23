import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateLinks1573667277452 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.query(`
        CREATE TABLE links (
          id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
          url VARCHAR(2000) NOT NULL,
          url_hash CHAR(32) NOT NULL UNIQUE,
          code CHAR(6) NOT NULL UNIQUE,
          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
      `)
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.query(`DROP TABLE links`)
    }

}
