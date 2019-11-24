import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinkModule } from './links/links.module';
import { configuration } from '../config/database.config';

@Module({
  imports: [TypeOrmModule.forRoot(configuration), LinkModule],
})
export class AppModule {}
