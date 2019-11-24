import { TypeOrmModuleOptions } from '@nestjs/typeorm'

let envName = process.env['NODE_ENV'] || 'development'
let databaseName = `shorty_${envName}.sqlite3`

export const configuration:TypeOrmModuleOptions = {
  type: 'sqlite',
  database: `db/${databaseName}`,
  synchronize: false,
  migrationsRun: false,
  logging: true,
  entities: ['dist/src/**/*.entity.js'],
  migrations: ["dist/db/migrations/**/*.js"],
  cli: {
    migrationsDir: "db/migrations"
  }
}
