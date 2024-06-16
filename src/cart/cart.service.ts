import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './cart.entity';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    private readonly userService: UserService,
  ) {}

  async findAll(): Promise<Cart[]> {
    return this.cartRepository.find({ relations: ['user'] });
  }

  async findOne(id: number): Promise<Cart> {
    const cart = await this.cartRepository
      .createQueryBuilder('cart')
      .leftJoinAndSelect('cart.user', 'user')
      .where('cart.id = :id', { id })
      .getOne();

    if (!cart) {
      throw new Error(`Carrinho com ${id} não encontrado`);
    }

    return cart;
  }

  async create(createCartDto: CreateCartDto): Promise<Cart> {
    const { userId } = createCartDto;

    // Busca o usuário pelo id para associá-lo ao carrinho
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new Error(`Usuário com id ${userId} não encontrado`);
    }

    const cart = new Cart();
    cart.user = user;

    return this.cartRepository.save(cart);
  }

  async update(id: number, updateCartDto: UpdateCartDto): Promise<Cart> {
    const cart = await this.findOne(id);
    if (!cart) {
      throw new Error(`Carrinho com ${id} não encontrado`);
    }

    // Verifica se há atualização de usuário no DTO
    if (updateCartDto.userId !== undefined) {
      // Busca o usuário pelo id
      const user = await this.userService.findOne(updateCartDto.userId);
      if (!user) {
        throw new Error(`Usuário com id ${updateCartDto.userId} não encontrado`);
      }
      cart.user = user;
    }

    await this.cartRepository.save(cart);
    return cart;
  }

  async remove(id: number): Promise<void> {
    try {
      // Busca o carrinho pelo id com suas relações
      const cart = await this.cartRepository
        .createQueryBuilder('cart')
        .leftJoinAndSelect('cart.user', 'user')
        .where('cart.id = :id', { id })
        .getOne();

      if (!cart) {
        throw new NotFoundException(`Carrinho com id ${id} não encontrado`);
      }

      // Remove o carrinho encontrado
      await this.cartRepository.remove(cart);
    } catch (error) {
      if (error.name === 'EntityNotFoundError') {
        throw new NotFoundException(`Carrinho com id ${id} não encontrado`);
      } else {
        throw new Error(`Falha ao remover carinho com id ${id}: ${error.message}`);
      }
    }
  }
}
