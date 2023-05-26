import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config/dist';
import * as morgan from 'morgan';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(morgan('dev'));
  const configService = app.get(ConfigService);
  app.setGlobalPrefix('api/v1');
  await app.listen(configService.get('PORT'));
}
bootstrap();
