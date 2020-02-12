require('dotenv').config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'https://inspiring-kare-d8a73a.netlify.com',
  });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
