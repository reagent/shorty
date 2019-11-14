import { Controller, Get } from '@nestjs/common';
// import { AppService } from './app.service';
import { LinkService } from './link.service';
import { Link } from './link.entity';


@Controller()
export class AppController {
  constructor(private readonly linkService: LinkService) {}

  @Get()
  getHello(): Promise<Link[]> {
    return this.linkService.findAll();
  }
}
