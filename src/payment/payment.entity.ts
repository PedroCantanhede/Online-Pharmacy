import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Order } from '../order/order.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, order => order.payments)
  order: Order;

  @Column()
  paymentMethod: string;

  @Column('decimal')
  amount: number;

  @Column()
  paymentStatus: string;
}
