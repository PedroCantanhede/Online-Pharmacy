import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItem } from './cart-item.entity';
import { CartItemService } from './cart-item.service';
import { CartItemController } from './cart-item.controller';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [TypeOrmModule.forFeature([CartItem]), ProductModule],
  providers: [CartItemService],
  controllers: [CartItemController],
  exports: [CartItemService],
})
export class CartItemModule {}
