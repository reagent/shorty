import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { LinkService } from './link.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { Link } from './link.entity'
import { LinkModule } from './link.module'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "database.sqlite",
      entities: [Link],
      synchronize: false

    }),
    LinkModule
  ],
  // controllers: [AppController]
  // ,
  // providers: [LinkService],
})
export class AppModule {}
//   constructor(private readonly connection: Connection) {}
// }
