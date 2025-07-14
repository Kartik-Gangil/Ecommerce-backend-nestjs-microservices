import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*', // or specify allowed origins like ['http://localhost:3000']
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true,
    },
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'cart_queue_v2',
      queueOptions: {
        durable: true,
      },
    },
  })

  await app.startAllMicroservices();
  await app.listen(process.env.PORT ?? 3334);
}
bootstrap();
