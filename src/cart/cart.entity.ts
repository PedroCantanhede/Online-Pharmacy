import { Entity, PrimaryGeneratedColumn, OneToOne, OneToMany } from 'typeorm';
import { User } from '../user/user.entity';
import { CartItem } from '../cart-item/cart-item.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, user => user.cart)
  user: User;

  @OneToMany(() => CartItem, cartItem => cartItem.cart)
  cartItems: CartItem[];
}