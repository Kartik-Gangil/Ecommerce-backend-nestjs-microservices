import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*', // or specify allowed origins like ['http://localhost:3000']
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true,
    },
  });
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true
  }))

  
  await app.startAllMicroservices();
  await app.listen(process.env.PORT ?? 3333);
}
bootstrap();
