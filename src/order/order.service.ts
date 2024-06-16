import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  findAll(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  findOne(id: number): Promise<Order> {
    return this.orderRepository.findOneBy({ id });
  }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = this.orderRepository.create(createOrderDto);
    return this.orderRepository.save(order);
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    await this.orderRepository.update(id, updateOrderDto);
    return this.orderRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.orderRepository.delete(id);
  }
}

