import { NestFactory } from '@nestjs/core'
import { INestApplication } from '@nestjs/common';
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import  { ValidationError } from 'class-validator'
import { UnprocessableEntityException } from '@nestjs/common'

class Ex extends UnprocessableEntityException {
  constructor(errors: ValidationError[]) {
    console.log('in constructor', errors)

  //   ValidationError {
  //     target: LinkDto {},
  //     value: undefined,
  //     property: 'longUrl',
  //     children: [],
  //     constraints: {
  //       length: 'longUrl must be longer than or equal to 1 characters',
  //       isUrl: 'longUrl must be an URL address'
  //     }
  //   }
  // ]

    super()
  }

  // private x() {

  // }

}

export const application = async ():Promise<INestApplication> => {
  let app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: (errors: ValidationError[]) => new Ex(errors)
  }))

  return app
}
