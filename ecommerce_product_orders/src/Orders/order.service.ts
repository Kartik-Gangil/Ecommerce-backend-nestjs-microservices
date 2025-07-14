import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaClientValidationError } from "generated/prisma/runtime/library";
import { orderDTO } from "src/DTO";
import { PrismaService } from "src/Prisma/prisma.service";


@Injectable()
export class OrderService {
    constructor(private prisma: PrismaService) { }
    // set order function
    async setorder(dto: orderDTO, decoded: string) {
        try {
            if (!dto.item || !Array.isArray(dto.item) || dto.item.length === 0) {
                throw new ForbiddenException('Order must contain at least one item.');
            }

            // create a new order w.r.t order schema
            const order = await this.prisma.order.create({
                data: {
                    uid: decoded,
                    amount: dto.amount,
                    Update_at: new Date(),
                    item: {
                        create: dto.item.map((item) => ({
                            productId: item.productId,
                            quantity: item.quantity,
                            pricePerUnit: item.pricePerUnit
                        }))
                    }
                },
                // include the sub item object and save in the array
                include: {
                    item: true
                }
            })
            return order;
        } catch (error) {
            if (error instanceof PrismaClientValidationError) {
                throw new ForbiddenException(error.message);
            }
            throw new ForbiddenException('Something went wrong while placing the order.');
        }
    }
    // get order function
    async getorder(decoded: string) {
        // find the order on basis of userid
        try {
            const order = await this.prisma.order.findMany({
                where: { uid: decoded }, include: {
                    item: {
                        include: {
                            product:true
                        }
                    }, 
                }
            })

            // not exist return not found
            if (!order) {
                throw new ForbiddenException("Not found");
            }
            // if exist return orders
            return order;
        }
        catch (e) {
            return e
        }
    }
}