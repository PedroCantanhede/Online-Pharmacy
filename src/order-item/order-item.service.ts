import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItem } from './order-item.entity';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
  ) {}

  findAll(): Promise<OrderItem[]> {
    return this.orderItemRepository.find();
  }

  findOne(id: number): Promise<OrderItem> {
    return this.orderItemRepository.findOneBy({ id });
  }

  async create(createOrderItemDto: CreateOrderItemDto): Promise<OrderItem> {
    const orderItem = this.orderItemRepository.create(createOrderItemDto);
    return this.orderItemRepository.save(orderItem);
  }

  async update(id: number, updateOrderItemDto: UpdateOrderItemDto): Promise<OrderItem> {
    await this.orderItemRepository.update(id, updateOrderItemDto);
    return this.orderItemRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.orderItemRepository.delete(id);
  }
}

