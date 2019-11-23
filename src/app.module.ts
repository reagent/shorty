import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinkModule } from './link/link.module'
import { Link } from './link/link.entity'

// Some duplication between here and ormconfig.json
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "database.sqlite",
      entities: [Link],
      synchronize: false,
      migrationsRun: false,
      logging: true
    }),
    LinkModule
  ],
})
export class AppModule {}
