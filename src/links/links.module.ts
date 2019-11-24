import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Link } from './link.entity';
import { LinkService } from './link.service';
import { LinksController } from './links.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Link])],
  providers: [LinkService],
  controllers: [LinksController],
})
export class LinkModule {}
