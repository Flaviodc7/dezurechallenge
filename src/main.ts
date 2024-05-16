import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Dezure Challenge')
    .setDescription(
      'Documentación para la API de productos, usuarios y prompts',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      authAction: {
        Bearer: {
          name: 'Bearer',
          schema: {
            type: 'apiKey',
            in: 'header',
            name: 'Authorization',
            description: '',
          },
          value:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJnZW5lcmFsX2VtYWlsIjoiYWRtaW5AYWRtaW4uY29tIn0.TCHl5_VMibulVgLk7fF4BzVC02MzirULLZDjPb8B9pQ',
        },
      },
      requestInterceptor: (req: { headers: { [x: string]: string } }) => {
        req.headers['Authorization'] =
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJnZW5lcmFsX2VtYWlsIjoiYWRtaW5AYWRtaW4uY29tIn0.TCHl5_VMibulVgLk7fF4BzVC02MzirULLZDjPb8B9pQ';
        return req;
      },
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
