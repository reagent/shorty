import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { INestApplication } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { application } from '../src/application';
// import { Connection } from 'typeorm';

describe('Application endpoints', () => {
  let app: INestApplication;
  // let connection:Connection;

  afterAll(async () => {
    await app.close();
  });

  beforeAll(async () => {
    app = await application();
    app.init();

    // connection = app.get(Connection)
    // connection.manager.
  });

  describe('POST /short_link', () => {
    it('returns a 404 when the content-type is not specified', async () => {
      await request(app.getHttpServer())
        .post('/')
        .expect(404);
    });

    it('returns a 422 error when there is an empty payload', async () => {
      await request(app.getHttpServer())
        .post('/short_link')
        .set('Content-Type', 'application/json')
        .send({})
        .expect('Content-Type', /application\/json/)
        .expect(422)
        .then(response => {
          expect(JSON.parse(response.text)).toEqual({
            errors: {
              longUrl: [
                'longUrl must be longer than or equal to 1 characters',
                'longUrl must be an URL address',
              ],
            },
          });
        });
    });
  });

  // it('/ (GET)', () => {
  //   return request(app.getHttpServer())
  //     .get('/')
  //     .expect(200)
  //     .expect('Hello World!');
  // });
});
