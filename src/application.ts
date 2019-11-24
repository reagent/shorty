import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { ValidationException } from './exceptions/validation.exception';
import { configuration } from '../config/application.config';

export const application = async (): Promise<INestApplication> => {
  const app = await NestFactory.create(AppModule, configuration);

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) =>
        new ValidationException(errors),
    }),
  );

  return app;
};
