import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config/dist';
import * as morgan from 'morgan';

import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(morgan('dev'));
  app.useGlobalPipes(
    new ValidationPipe({
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  const configService = app.get(ConfigService);
  app.setGlobalPrefix('api/v1');
  await app.listen(configService.get('PORT'));
}
bootstrap();
