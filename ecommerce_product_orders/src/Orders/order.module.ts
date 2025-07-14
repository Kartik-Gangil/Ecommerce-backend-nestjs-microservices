import { Module } from "@nestjs/common";
import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";
import { PrismaModule } from "src/Prisma/prisma.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [PrismaModule, JwtModule.register({ secret: process.env.JWT_SECRET })],
    controllers: [OrderController],
    providers:[OrderService]
})
export class OrderModule { }