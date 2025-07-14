import { Body, Controller, Get, Headers, Post } from "@nestjs/common";
import { OrderService } from "./order.service";
import { orderDTO } from "src/DTO";
import { JwtService } from '@nestjs/jwt';


@Controller('order')

export class OrderController {
    constructor(private orderService: OrderService, private jwt: JwtService) { }
    // create an order 
    @Post('setorder')
    setorder(@Headers('authorization') authHeader: string, @Body() dto: orderDTO) {
        const token = authHeader?.split(' ')[1]
        const decoded = this.jwt.verify(token, { secret: process.env.JWT_SECRET }); 
        return this.orderService.setorder(dto , decoded);
    }
    //  getting an created order
    @Get('getorder')
    getorder(@Headers('authorization') authHeader: string) {
        const token = authHeader?.split(' ')[1]
        const decoded = this.jwt.verify(token, { secret: process.env.JWT_SECRET });
        return this.orderService.getorder(decoded);
    }
}