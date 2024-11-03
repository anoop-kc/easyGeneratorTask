import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config as envConfig } from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'], // Enable desired log levels
  });

  envConfig();

  // Enable CORS with specific options
  app.enableCors({
    origin: '*', // Change this to the front-end URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('User API')
    .setDescription('API for user authentication and onboarding')
    .setVersion('1.0')
    .addBearerAuth() // Adds bearer token authentication to Swagger
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('apidocs', app, document, {
    swaggerOptions: {
      supportedSubmitMethods: [], // Disables all HTTP methods for "Try it out"
    },
  });

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
