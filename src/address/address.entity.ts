import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  street: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  zipCode: string;

  @Column()
  country: string;

  @ManyToOne(() => User, user => user.addresses)
  user: User;
}
