import { Body, Controller, Delete, Get, Headers, Param, Post, Put } from "@nestjs/common";
import { CartService } from "./cart.service";
import { JwtService } from "@nestjs/jwt";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { cartDTOItem } from "src/DTO";

@Controller('cart')

export class CartController {
    constructor(private cartService: CartService, private jwt: JwtService) { }
    // create cart after create a new user automatically via queue rabbitmq 
    @MessagePattern('create-cart')
    CreateCart(@Payload() data: string) {
        return this.cartService.CreateCart(data);
    }

    @Post('/addCart')
    addCart(@Headers('authorization') authHeader: string, @Body() dto: cartDTOItem) {
        const token = authHeader?.split(' ')[1]
        const decoded = this.jwt.verify(token, { secret: process.env.JWT_SECRET });
        return this.cartService.addCart(decoded, dto)
    }
    @Get('/getCart')
    getCart(@Headers('authorization') authHeader: string) {
        const token = authHeader?.split(' ')[1]
        const decoded = this.jwt.verify(token, { secret: process.env.JWT_SECRET });
        return this.cartService.getCart(decoded)
    }
    @Delete('/:id')
    deleteCartItem(@Headers('authorization') authHeader: string, @Param('id') id: string) {
        const token = authHeader?.split(' ')[1]
        const decoded = this.jwt.verify(token, { secret: process.env.JWT_SECRET });
        return this.cartService.deleteCartItem(decoded, id)
    }
    @Put('/:id')
    updateCartItem(@Headers('authorization') authHeader: string, @Body() quantity: number, @Param('id') id: string) {
        const token = authHeader?.split(' ')[1]
        const decoded = this.jwt.verify(token, { secret: process.env.JWT_SECRET });
        return this.cartService.updateCartItem(decoded, quantity, id)
        // console.log({authHeader , id , quantity})
    }
}