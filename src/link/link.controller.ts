import { Controller, Get } from "@nestjs/common"
import { LinkService } from "./link.service"
import { Link } from "./link.entity"

@Controller()
export class LinkController {
  constructor(private readonly service: LinkService) {}

  @Get()
  index(): Promise<Link[]> {
    return this.service.findAll();
  }
}