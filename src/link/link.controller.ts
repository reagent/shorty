import { UseInterceptors, Header  } from "@nestjs/common"
import { Controller, Post, Body, ClassSerializerInterceptor } from "@nestjs/common"
import { LinkService, LinkDto } from "./link.service"
import { Link } from "./link.entity"
import { validate } from "class-validator"

@Controller()
export class LinkController {
  constructor(private readonly service: LinkService) {}

  // @UseInterceptors(ClassSerializerInterceptor)
  @Post("short_link")
  @Header("Content-Type", "application/json")
  async create(@Body() dto: LinkDto): Promise<Link> {
    return this.service.create(dto)
  }
  // async create(@Body() dto: LinkDto): Promise<Link> {
  //   console.log('controller dto', dto)
  //   return this.service.create(dto)
  // }
}
