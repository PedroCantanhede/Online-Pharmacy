import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Controller('addresses')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get()
  async findAll() {
    const addresses = await this.addressService.findAll();
    return {
      message: 'Endereços encontrados com sucesso!',
      data: addresses,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const address = await this.addressService.findOne(id);
    return {
      message: 'Endereço encontrado com sucesso!',
      data: address,
    };
  }

  @Post()
  async create(@Body() createAddressDto: CreateAddressDto) {
    const address = await this.addressService.create(createAddressDto);
    return {
      message: 'Endereço criado com sucesso!',
      data: address,
    };
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateAddressDto: UpdateAddressDto) {
    const address = await this.addressService.update(id, updateAddressDto);
    return {
      message: 'Endereço atualizado com sucesso!',
      data: address,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.addressService.remove(id);
    return {
      message: 'Endereço deletado com sucesso!',
    };
  }
}
