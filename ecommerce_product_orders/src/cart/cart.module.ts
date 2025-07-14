import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { PrismaModule } from 'src/Prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [PrismaModule, JwtModule.register({ secret: process.env.JWT_SECRET })],
    controllers: [CartController],
    providers: [CartService]
})
export class CartModule { }
