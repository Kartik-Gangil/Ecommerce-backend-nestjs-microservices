import { Module } from '@nestjs/common';
import { OrderModule } from './Orders/order.module';
import { ProductModule } from './Products/product.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [OrderModule , ProductModule, CartModule],
})
export class AppModule {}
