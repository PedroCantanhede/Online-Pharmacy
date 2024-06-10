import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../user/user.entity';
import { OrderItem } from '../order-item/order-item.entity';
import { Payment } from '../payment/payment.entity'; // Adicione esta importação

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.orders)
  user: User;

  @Column('decimal')
  totalAmount: number;

  @Column()
  status: string;

  @OneToMany(() => OrderItem, orderItem => orderItem.order)
  orderItems: OrderItem[];

  @OneToMany(() => Payment, payment => payment.order) // Adicione esta linha
  payments: Payment[];
}