import { application } from './application';

async function bootstrap() {
  const app = await application();
  app.listen(3000);
}

bootstrap();
