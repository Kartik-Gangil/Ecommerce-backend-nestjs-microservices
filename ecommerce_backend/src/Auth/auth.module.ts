import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { prismaModule } from "../Prisma/prisma.module";
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
    imports: [prismaModule, JwtModule.register({ secret: process.env.JWT_SECRET }), ClientsModule.register([
        {
            name: 'CartService',
            transport: Transport.RMQ,
            options: {
                urls: ['amqp://localhost:5672'],
                queue: 'cart_queue_v2',
                queueOptions: {
                    durable: true,
                },
            },
        },
    ]),],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule { }