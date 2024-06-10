import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { Product } from './product/product.entity';
import { UserModule } from './user/user.module'; 
import { CategoryModule } from './category/category.module';
import { OrderModule } from './order/order.module';
import { OrderItemModule } from './order-item/order-item.module';
import { CartModule } from './cart/cart.module';
import { CartItemModule } from './cart-item/cart-item.module';
import { PaymentModule } from './payment/payment.module';
import { AddressModule } from './address/address.module';
import { ReviewModule } from './review/review.module';
import { User } from './user/user.entity';
import { Category } from './category/category.entity';
import { Order } from './order/order.entity';
import { OrderItem } from './order-item/order-item.entity';
import { Cart } from './cart/cart.entity';
import { CartItem } from './cart-item/cart-item.entity';
import { Payment } from './payment/payment.entity';
import { Address } from './address/address.entity';
import { Review } from './review/review.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      entities: [User, Product, Category, Order, OrderItem, Cart, CartItem, Payment, Address, Review],
      synchronize: true,
    }),
    ProductModule,
    UserModule,
    CategoryModule,
    OrderModule,
    OrderItemModule,
    CartModule,
    CartItemModule,
    PaymentModule,
    AddressModule,
    ReviewModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}
