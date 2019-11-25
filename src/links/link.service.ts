import * as ShortId from 'shortid';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Link } from './link.entity';
import { UrlHasher } from './helpers/url-hasher.helper';
import { CreateDto } from './dto/create.dto';
import { ShowDto } from './dto/show.dto'

@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(Link)
    private readonly repo: Repository<Link>,
  ) {}

  async create(dto: CreateDto): Promise<ShowDto> {
    const hasher = new UrlHasher(dto.longUrl);
    const existing = await this.repo.findOne({ urlHash: hasher.hash });

    // let existing = await this.forHash(hasher.hash)

    if (existing) {
      let ret = new ShowDto()
      ret.longUrl = existing.url
      ret.shortLink = `http://localhost:3000/${existing.code}`

      return ret;
    }

    let shortCode = (ShortId.generate() + ShortId.generate()).replace(/[^\w\d]/, '').substring(0, 6)

    const link = this.repo.create({
      url: dto.longUrl,
      urlHash: hasher.hash,
      code: shortCode,
    });

    const created = await this.repo.save(link);

    let obj = new ShowDto
    obj.longUrl = link.url
    obj.shortLink = `http://localhost:3000/${link.code}`

    return obj;
  }
}
