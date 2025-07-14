import { ForbiddenException, Injectable } from "@nestjs/common";
import { ProductDTO } from "src/DTO";
import { PrismaService } from "src/Prisma/prisma.service";

@Injectable()
export class ProductService {
    constructor(private prisma: PrismaService) { }
    async addProduct(dto: ProductDTO) {
        try {
            const product = await this.prisma.product.create({
                data: {
                    name: dto.name,
                    description: dto.description,
                    price: dto.price,
                    stock: dto.stock,
                    image: dto.image,
                    categoryId: dto.categoryId,

                }
            })
            return product
        } catch (e) {
            return e
        }
    }
    async GetProduct(id: string) {
        try {
            const product = await this.prisma.product.findUnique({ where: { id } })
            if (!product) {
                throw new ForbiddenException("product not exist")
            }
            return product
        } catch (e) {
            return e
        }
    }
    async UpdateProduct(id: string , dto:ProductDTO) {
        try {
            const product = await this.prisma.product.update({
                where: { id }, data: {
                    name: dto.name,
                    description: dto.description,
                    price: dto.price,
                    stock: dto.stock,
                    image: dto.image,
                    categoryId: dto.categoryId,
                }
            })
            if (!product) {
                throw new ForbiddenException("product not exist")
            }
            return product
        } catch (e) {
            return e
        }
    }
    async DeleteProduct(id:string) {
        try {
            const product = await this.prisma.product.delete({ where: { id } })
            if (!product) {
                throw new ForbiddenException("product not exist")
            }
            return product
        } catch (e) {
            return e
        }
    }
    async GetAllProduct() {
        try {
            const product = await this.prisma.product.findMany()
            if (!product) {
                throw new ForbiddenException("not found")
            }
            return product
        } catch (e) {
            return e
        }
    }
}