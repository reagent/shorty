import { TypeOrmModule, InjectRepository } from "@nestjs/typeorm"
import { Injectable, Module, Controller, Get } from '@nestjs/common';
import { Entity, PrimaryGeneratedColumn, Column, Repository } from "typeorm"

// Entity
@Entity("links")
class Link { 
  @PrimaryGeneratedColumn()
  id: number

  @Column({length: 2000})
  url: string

  @Column({length: 6})
  code: string
}

// Service
@Injectable()
class LinkService {
  constructor(
    @InjectRepository(Link)
    private readonly linkRepository: Repository<Link>,
  ) {}

  findAll(): Promise<Link[]> {
    return this.linkRepository.find();
  }
}

@Controller()
export class LinkController {
  constructor(private readonly service: LinkService) {}

  @Get()
  index(): Promise<Link[]> {
    return this.service.findAll();
  }
}

// Module
@Module({
  imports: [TypeOrmModule.forFeature([Link])],
  providers: [LinkService],
  controllers: [LinkController],
})
class LinkModule {}

export { Link, LinkModule }
