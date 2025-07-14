import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ProductDTO } from "src/DTO";
import { ProductService } from "./product.service";


@Controller('product')
export class ProductController {
    constructor(private ProductService: ProductService) { }
    // add the product in DB
    @Post('add')
    addProduct(@Body() dto: ProductDTO) {
        return this.ProductService.addProduct(dto);
    }
    // get the specified product
    @Get(':id')
    GetProduct(@Param('id') id: string) {
        return this.ProductService.GetProduct(id);
    }
    // get all product
    @Get('/')
    GetAllProduct() {
        return this.ProductService.GetAllProduct();
    }
    // update the specified product
    @Put('/update/:id')
    UpdateProduct(@Param('id') id: string, @Body() dto: ProductDTO) {
        return this.ProductService.UpdateProduct(id, dto);
    }
    //  delete the specified product
    @Delete('/delete/:id')
    DeleteProduct(@Param('id') id: string) {
        return this.ProductService.DeleteProduct(id)
    }
}