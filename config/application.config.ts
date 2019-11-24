import { NestApplicationOptions, Logger } from '@nestjs/common';

export const configuration: NestApplicationOptions = {
  logger: (process.env.NODE_ENV === 'test') ? false : new Logger(),
};
