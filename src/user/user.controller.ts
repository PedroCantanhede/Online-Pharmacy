import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    const users = await this.userService.findAll();
    return {
      message: 'Usuários encontrados com sucesso!',
      data: users,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const user = await this.userService.findOne(id);
    return {
      message: 'Usuário encontrado com sucesso!',
      data: user,
    };
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    return {
      message: 'Usuário criado com sucesso!',
      data: user,
    };
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.userService.update(id, updateUserDto);
    return {
      message: 'Usuário atualizado com sucesso!',
      data: user,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.userService.remove(id);
    return {
      message: 'Usuário deletado com sucesso!',
    };
  }
}

