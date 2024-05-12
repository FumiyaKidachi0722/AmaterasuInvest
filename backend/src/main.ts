import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // CORSを許可
  await app.listen(4000); // 適切なポートに設定
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
