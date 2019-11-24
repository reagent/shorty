import { Header } from '@nestjs/common';
import { Controller, Post, Body } from '@nestjs/common';
import { LinkService } from './link.service';
import { Link } from './link.entity';
import { CreateDto } from './dto/create.dto';

@Controller()
export class LinksController {
  constructor(private readonly service: LinkService) {}

  // @UseInterceptors(ClassSerializerInterceptor)
  @Post('short_link')
  @Header('Content-Type', 'application/json')
  async create(@Body() dto: CreateDto): Promise<Link> {
    return this.service.create(dto);
  }
  // async create(@Body() dto: LinkDto): Promise<Link> {
  //   console.log('controller dto', dto)
  //   return this.service.create(dto)
  // }
}
