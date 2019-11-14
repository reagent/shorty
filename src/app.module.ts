import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Link, LinkModule } from './link'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "database.sqlite",
      entities: [Link],
      synchronize: false

    }),
    LinkModule
  ],
})
export class AppModule {}
