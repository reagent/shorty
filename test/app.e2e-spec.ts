import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { INestApplication } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common'
import { application } from '../src/application'

describe('Application endpoints', () => {
  let app:INestApplication;

  afterAll(async () => { await app.close() })

  beforeAll(async () => {
    app = await application()
    app.init()
  });

  describe('POST /short_link', () => {
    it('returns a 404 when the content-type is not specified', async () => {
      await request(app.getHttpServer()).post('/').expect(404)
    })

    it('returns a 400 error when there is an empty payload', async () => {
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
                'omg wat',
                'another'
              ]
            }
          })
        })
    })
  })

  // it('/ (GET)', () => {
  //   return request(app.getHttpServer())
  //     .get('/')
  //     .expect(200)
  //     .expect('Hello World!');
  // });
});
