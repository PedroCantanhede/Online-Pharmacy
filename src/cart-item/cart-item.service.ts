import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from './cart-item.entity';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { Product } from '../product/product.entity';

@Injectable()
export class CartItemService {
  constructor(
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  findAll(): Promise<CartItem[]> {
    return this.cartItemRepository.find();
  }

  findOne(id: number): Promise<CartItem> {
    return this.cartItemRepository.findOneBy({ id });
  }

  async create(createCartItemDto: CreateCartItemDto): Promise<CartItem> {
    const product = await this.productRepository.findOneBy({ id: createCartItemDto.productId });
    if (!product) {
      throw new Error('Produto não encontrado');
    }

    const cartItem = this.cartItemRepository.create({
      ...createCartItemDto,
      price: product.price, 
    });
    return this.cartItemRepository.save(cartItem);
  }

  async update(id: number, updateCartItemDto: UpdateCartItemDto): Promise<CartItem> {
    await this.cartItemRepository.update(id, updateCartItemDto);
    return this.cartItemRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.cartItemRepository.delete(id);
  }
}
