import { ForbiddenException, Injectable } from "@nestjs/common";
import { cartDTOItem } from "src/DTO";
import { PrismaService } from "src/Prisma/prisma.service";

@Injectable()
export class CartService {
    constructor(private prisma: PrismaService) { }
    async CreateCart(id: string) {
        try {
            const cart = this.prisma.cart.create({
                data: {
                    uid: id,
                }
            })
            return cart
        }
        catch (e) {
            return e
        }
    }

    async addCart(id: string, dto: cartDTOItem) {
        try {
            // Step 1: Check if cart exists for this user
            let cart = await this.prisma.cart.findFirst({
                where: { uid: id },
            });

            // Step 2: If not found, create a new cart
            if (!cart) {
                cart = await this.prisma.cart.create({
                    data: {
                        uid: id,
                    },
                });
            }

            // Step 3: Add item to cart (always creates a new entry)
            const updatedCart = await this.prisma.cart.update({
                where: { id: cart.id },
                data: {
                    item: {
                        create: {
                            productId: dto.productId,
                            quantity: dto.quantity,
                            pricePerUnit: dto.pricePerUnit,
                        },
                    },
                },
                include: { item: true },
            });

            return updatedCart;
        } catch (error) {
            return error
        }
    }

    async getCart(id: string) {
        try {
            const cart = await this.prisma.cart.findFirst({
                where: { uid: id }, include: {
                    item: {
                        include: {
                            product: true
                        }
                    }
                }
            })
            if (!cart) {
                throw new ForbiddenException('cart item not found')
            }
            return cart
        } catch (e) {
            return e
        }
    }


    // delete cart item service

    async deleteCartItem(decoded: string, id: string) {
        try {
            const cart = await this.prisma.cart.findFirst({ where: { uid: decoded } })
            if (!cart) {
                return new ForbiddenException('no cart found')
            }
            const cartItem = await this.prisma.cartItem.findFirst({
                where: {
                    id: id,
                    cartId: cart.id, // Ensures it belongs to the user's cart
                },
            });

            if (!cartItem) {
                throw new ForbiddenException('Cart item not found or unauthorized');
            }

            await this.prisma.cartItem.delete({
                where: {
                    id: id,
                },
            });

            return { message: 'Cart item deleted successfully' };
        } catch (e) {
            return e
        }
    }


    async updateCartItem(decoded: string, quantity: number, id: string) {
        try {
            const cart = await this.prisma.cart.findFirst({ where: { uid: decoded } })
            if (!cart) {
                return new ForbiddenException('no cart found')
            }
            const cartItem = await this.prisma.cartItem.findFirst({
                where: {
                    cartId: cart.id,
                    productId: id, 
                },
            });
            if (!cartItem) {
                throw new ForbiddenException('Cart item not found or unauthorized');
            }
            await this.prisma.cartItem.update({
                where: {
                    id: cart.id,
                },
                data: {
                    quantity: quantity
                }
            });

            return { message: 'Cart item update successfully' };
        } catch (e) {
            return e
        }
    }

}