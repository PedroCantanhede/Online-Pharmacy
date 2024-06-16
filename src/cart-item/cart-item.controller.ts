import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@Controller('cart-items')
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  @Get()
  async findAll() {
    const cartItems = await this.cartItemService.findAll();
    return {
      message: 'Itens do carrinho encontrados com sucesso!',
      data: cartItems,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const cartItem = await this.cartItemService.findOne(id);
    return {
      message: 'Item do carrinho encontrado com sucesso!',
      data: cartItem,
    };
  }

  @Post()
  async create(@Body() createCartItemDto: CreateCartItemDto) {
    const cartItem = await this.cartItemService.create(createCartItemDto);
    return {
      message: 'Item do carrinho criado com sucesso!',
      data: cartItem,
    };
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateCartItemDto: UpdateCartItemDto) {
    const cartItem = await this.cartItemService.update(id, updateCartItemDto);
    return {
      message: 'Item do carrinho atualizado com sucesso!',
      data: cartItem,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.cartItemService.remove(id);
    return {
      message: 'Item do carrinho deletado com sucesso!',
    };
  }
}
