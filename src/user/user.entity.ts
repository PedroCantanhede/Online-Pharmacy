import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Order } from '../order/order.entity';
import { Cart } from '../cart/cart.entity';
import { Address } from '../address/address.entity';
import { Review } from '../review/review.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @OneToMany(() => Order, order => order.user)
  orders: Order[];

  @OneToOne(() => Cart)
  @JoinColumn()
  cart: Cart;

  @OneToMany(() => Address, address => address.user)
  addresses: Address[];

  @OneToMany(() => Review, review => review.user)
  reviews: Review[];
}