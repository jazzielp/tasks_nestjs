import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config/dist';
import * as morgan from 'morgan';
import { DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //Use logs
  //...............................................
  app.use(morgan('dev'));

  //Use validation
  //...............................................
  app.useGlobalPipes(
    new ValidationPipe({
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  //Use global prefix
  //...............................................
  const configService = app.get(ConfigService);

  //Use version
  //...............................................
  app.setGlobalPrefix('api/v1');

  //Use Swagger to documentation
  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('Aplications to manage tasks')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/docs', app, document);

  //Use Port
  //...............................................
  await app.listen(configService.get('PORT'));
}
bootstrap();
