// cart.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartService } from './cart.service';
import { Cart } from './cart.entity';
import { UserService } from '../user/user.service'; 
import { UserModule } from '../user/user.module'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart]),
    UserModule, 
  ],
  providers: [CartService], 
  exports: [CartService], 
})
export class CartModule {}
