import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async findAll() {
    const orders = await this.orderService.findAll();
    return {
      message: 'Pedidos encontrados com sucesso!',
      data: orders,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const order = await this.orderService.findOne(id);
    return {
      message: 'Pedido encontrado com sucesso!',
      data: order,
    };
  }

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    const order = await this.orderService.create(createOrderDto);
    return {
      message: 'Pedido criado com sucesso!',
      data: order,
    };
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateOrderDto: UpdateOrderDto) {
    const order = await this.orderService.update(id, updateOrderDto);
    return {
      message: 'Pedido atualizado com sucesso!',
      data: order,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.orderService.remove(id);
    return {
      message: 'Pedido deletado com sucesso!',
    };
  }
}

