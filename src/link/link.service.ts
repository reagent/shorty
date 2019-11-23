import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { Link } from "./link.entity"
import * as md5 from "md5"
import * as URI from "uri-js"
import * as ShortId from "shortid"


import { IsNotEmpty } from "class-validator"

class LinkDto { 
  @IsNotEmpty()
  readonly longUrl: string
}

// class ShowLinkDto {
//   readonly longUrl: string
//   get shortLink():string {

//   }
// }

@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(Link)
    private readonly repo: Repository<Link>,
  ) {}

  async create(dto: LinkDto): Promise<Link> {
    let hasher = new URLHasher(dto.longUrl)
    let existing = await this.repo.findOne({urlHash: hasher.hash})

    // let existing = await this.forHash(hasher.hash)

    if (existing) { return existing }

    let link = this.repo.create({
      url: dto.longUrl,
      urlHash: hasher.hash,
      code: ShortId.generate().substring(0,6)
    })

    let created = await this.repo.save(link)

    return created





    // let created = this.repo.create({
    //   url: dto.longUrl,
    //   urlHash: hasher.hash,
    //   code: "DOOF"
    // })

    // console.log(link.id)

    // return link  



    // let link = new Link({
    //   url: dto.longUrl
    // })


    // return 
  }

  // private async forHash(hash: string): Promise<Link> {
  //   return this.repo.findOne({where: {urlHash: hash}})
  // }



  // findAll(): Promise<Link[]> {
  //   return this.repo.find();
  // }
}

class URLValidator { 
  private url: string
  
  constructor(url: string) { 
    this.url = url
  }
}

class URLHasher { 
  private url: string

  constructor(url: string) {
    this.url = url
  }

  get hash(): string {
    return md5(this.normalizedUrl)
  }

  get normalizedUrl(): string { 
    let uri = URI.parse(this.url)

    if (uri.query) {
      uri.query = this.reorderQueryParams(uri.query)
    }

    return URI.normalize(URI.serialize(uri))
  }

  private reorderQueryParams(params: string): string {
    return params.split("&").sort((a,b) => {
      let ax = a.split("=")
      let bx = b.split("=")

      if (ax[0] > bx[0]) { return 1 }
      if (ax[0] < bx[0]) { return -1 }
      
      return 0
    }).join("&")
  } 
}

export { URLValidator, URLHasher, LinkDto }