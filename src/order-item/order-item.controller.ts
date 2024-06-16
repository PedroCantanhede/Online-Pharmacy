import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';

@Controller('order-items')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Get()
  async findAll() {
    const orderItems = await this.orderItemService.findAll();
    return {
      message: 'Itens do pedido encontrados com sucesso!',
      data: orderItems,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const orderItem = await this.orderItemService.findOne(id);
    return {
      message: 'Item do pedido encontrado com sucesso!',
      data: orderItem,
    };
  }

  @Post()
  async create(@Body() createOrderItemDto: CreateOrderItemDto) {
    const orderItem = await this.orderItemService.create(createOrderItemDto);
    return {
      message: 'Item do pedido criado com sucesso!',
      data: orderItem,
    };
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateOrderItemDto: UpdateOrderItemDto) {
    const orderItem = await this.orderItemService.update(id, updateOrderItemDto);
    return {
      message: 'Item do pedido atualizado com sucesso!',
      data: orderItem,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.orderItemService.remove(id);
    return {
      message: 'Item do pedido deletado com sucesso!',
    };
  }
}

