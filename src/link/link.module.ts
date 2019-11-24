import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Link } from './link.entity';
import { LinkService } from './link.service';
import { LinkController } from './link.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Link])],
  providers: [LinkService],
  controllers: [LinkController],
})
export class LinkModule {}
