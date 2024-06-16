import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller('carts')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  async findAll() {
    const carts = await this.cartService.findAll();
    return {
      message: 'Carrinhos encontrados com sucesso!',
      data: carts,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const cart = await this.cartService.findOne(id);
    return {
      message: 'Carrinho encontrado com sucesso!',
      data: cart,
    };
  }

  @Post()
  async create(@Body() createCartDto: CreateCartDto) {
    const cart = await this.cartService.create(createCartDto);
    return {
      message: 'Carrinho criado com sucesso!',
      data: cart,
    };
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateCartDto: UpdateCartDto) {
    const cart = await this.cartService.update(id, updateCartDto);
    return {
      message: 'Carrinho atualizado com sucesso!',
      data: cart,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.cartService.remove(id);
    return {
      message: 'Carrinho deletado com sucesso!',
    };
  }
}

