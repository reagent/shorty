import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinkModule } from './link/link.module'
import { Link } from './link/link.entity'
import { configuration } from '../config/database.config'

@Module({
  imports: [
    TypeOrmModule.forRoot(configuration),
    LinkModule
  ],
})
export class AppModule {}
