import { application } from './application'

async function bootstrap() {
  let app = await application()
  app.listen(3000);
}

bootstrap();
