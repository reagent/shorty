import * as ShortId from 'shortid';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Link } from './link.entity';
import { UrlHasher } from './helpers/url-hasher.helper';
import { CreateDto } from './dto/create.dto';

@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(Link)
    private readonly repo: Repository<Link>,
  ) {}

  async create(dto: CreateDto): Promise<Link> {
    const hasher = new UrlHasher(dto.longUrl);
    const existing = await this.repo.findOne({ urlHash: hasher.hash });

    // let existing = await this.forHash(hasher.hash)

    if (existing) {
      return existing;
    }

    const link = this.repo.create({
      url: dto.longUrl,
      urlHash: hasher.hash,
      code: ShortId.generate().substring(0, 6),
    });

    const created = await this.repo.save(link);

    return created;
  }
}
