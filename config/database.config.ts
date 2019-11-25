import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const envName = process.env.NODE_ENV || 'development';
const databaseName = `shorty_${envName}.sqlite3`;

export const configuration: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: `db/${databaseName}`,
  synchronize: false,
  migrationsRun: false,
  logging: (process.env.NODE_ENV !== 'test'),
  entities: ['dist/src/**/*.entity.js'],
  migrations: ['dist/db/migrations/**/*.js'],
  cli: {
    migrationsDir: 'db/migrations',
  },
};
