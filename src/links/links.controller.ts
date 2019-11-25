import { Header } from '@nestjs/common';
import { Controller, Post, Body, Req } from '@nestjs/common';
import { Request } from 'express'
import { LinkService } from './link.service';
import { CreateDto } from './dto/create.dto';
import { ShowDto } from './dto/show.dto';

@Controller()
export class LinksController {
  constructor(private readonly service: LinkService) {}

  @Post('short_link')
  @Header('Content-Type', 'application/json')
  async create(@Req() request: Request, @Body() dto: CreateDto): Promise<ShowDto> {
    return this.service.create(dto);
  }
  // async create(@Body() dto: LinkDto): Promise<Link> {
  //   console.log('controller dto', dto)
  //   return this.service.create(dto)
  // }
}
