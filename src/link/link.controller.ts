import { UseInterceptors  } from "@nestjs/common"
import { Controller, Post, Body, ClassSerializerInterceptor } from "@nestjs/common"
import { LinkService, LinkDto } from "./link.service"
import { Link } from "./link.entity"

@Controller()
export class LinkController {
  constructor(private readonly service: LinkService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post("short_link")
  async create(@Body() dto: LinkDto): Promise<Link> {
    return this.service.create(dto)
    // let created = this.service.create(dto)

    // // if (!created) { throw new HTTPException() }

    // return created


    // try create
    // if not success, throw new HTTPException
    // 
    // return this.service.findAll()
  }

  // @Get()
  // index(): Promise<Link[]> {
  //   return this.service.findAll();
  // }
}