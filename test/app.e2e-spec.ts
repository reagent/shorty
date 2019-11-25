import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { application } from '../src/application';
import { Connection, EntityManager } from 'typeorm';
import { Link } from '../src/links/link.entity'
import { UrlHasher } from '../src/links/helpers/url-hasher.helper';

describe('Application endpoints', () => {
  let app: INestApplication;
  let connection:Connection;
  let manager:EntityManager;

  afterAll(async () => {
    await app.close();
  });

  beforeAll(async () => {
    app = await application();
    app.init();
  });

  beforeEach(async () => {
    connection = app.get(Connection)
    manager = connection.manager

    await connection.createQueryRunner().startTransaction()
  })

  afterEach(async () => {
    await connection.createQueryRunner().rollbackTransaction()
  })

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

    it('returns a 422 when the payload is invalid', async () => {
      await request(app.getHttpServer())
        .post('/short_link')
        .set('Content-Type', 'application/json')
        .send({longUrl: ''})
        .expect(422)
        .then(response => {
          expect(Object.keys(JSON.parse(response.text))).toEqual(['errors'])
        })
    })

    it('returns a 400 when the payload cannot be parsed', async () => {
      await request(app.getHttpServer())
        .post('/short_link')
        .set('Content-Type', 'application/json')
        .send('{')
        .expect(400)
    })

    it('creates a new short link when one does not already exist', async () => {
      let initialCount = await manager.count(Link)

      await request(app.getHttpServer())
        .post('/short_link')
        .set('Content-Type', 'application/json')
        .send({longUrl: "http://google.com"})
        .expect(201)
        .then(response => {
          let data = JSON.parse(response.text)

          expect(data.longUrl).toEqual('http://google.com')
          expect(data.shortLink).toMatch(/^http:\/\/localhost:3000\/[\w\d]{6}$/)
        })

        let currentCount = await manager.count(Link)

        expect(currentCount).toEqual(initialCount + 1)
    })

    it('returns an existing short link', async () => {
      let link = new Link()
      link.url = "http://google.com"
      link.code = "d3db3f"
      link.urlHash = (new UrlHasher(link.url)).hash

      await manager.save(link)

      expect(link.id).not.toBeUndefined()

      let initialCount = await manager.count(Link)

      await request(app.getHttpServer())
        .post('/short_link')
        .set('Content-Type', 'application/json')
        .send({longUrl: 'http://google.com'})
        .expect(201) // should probably be 200
        .then(response => {
          expect(JSON.parse(response.text)).toEqual({
            longUrl: 'http://google.com',
            shortLink: 'http://localhost:3000/d3db3f'
          })
        })

      let currentCount = await manager.count(Link)

      expect(currentCount).toEqual(initialCount)
    })

    it('is case insensitive when returning an existing link', async () => {
      let link = new Link()
      link.url = "HTTP://GOOGLE.COM"
      link.code = "d3db3f"
      link.urlHash = (new UrlHasher(link.url)).hash

      await manager.save(link)

      expect(link.id).not.toBeUndefined()

      await request(app.getHttpServer())
        .post('/short_link')
        .set('Content-Type', 'application/json')
        .send({longUrl: 'http://google.com'})
        .expect(201) // 200?
        .then(response => {
          expect(JSON.parse(response.text)).toEqual({
            longUrl: 'HTTP://GOOGLE.COM',
            shortLink: 'http://localhost:3000/d3db3f'
          })
        })
    })
  });

  describe('GET /<code>', () => {
    it('returns a 404 when the code is not found', async () => {
      await request(app.getHttpServer())
        .get('/d3db3f')
        .expect(404)
    })

    it('sends a permanent redirect when the code is found', async () => {
      let link = new Link()

      link.url = "http://google.com"
      link.code = "d3db3f"
      link.urlHash = (new UrlHasher(link.url)).hash

      await manager.save(link)

      expect(link.id).not.toBeUndefined()

      await request(app.getHttpServer())
        .get('/d3db3f')
        .expect('Location', 'http://google.com')
    })
  });

  // it('/ (GET)', () => {
  //   return request(app.getHttpServer())
  //     .get('/')
  //     .expect(200)
  //     .expect('Hello World!');
  // });
});
