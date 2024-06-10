import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Category } from '../category/category.entity';
import { Review } from '../review/review.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @Column()
  description: string;

  @ManyToOne(() => Category, category => category.products)
  category: Category;

  @OneToMany(() => Review, review => review.product)
  reviews: Review[];
}