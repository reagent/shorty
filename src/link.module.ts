import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinkService } from './link.service';
import { AppController } from './app.controller';
import { Link } from './link.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Link])],
  providers: [LinkService],
  controllers: [AppController],
})
export class LinkModule {}