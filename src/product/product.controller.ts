import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll() {
    const products = await this.productService.findAll();
    return {
      message: 'Produtos encontrados com sucesso!',
      data: products,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const product = await this.productService.findOne(id);
    return {
      message: 'Produto encontrado com sucesso!',
      data: product,
    };
  }

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    const product = await this.productService.create(createProductDto);
    return {
      message: 'Produto criado com sucesso!',
      data: product,
    };
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateProductDto: Partial<CreateProductDto>) {
    const product = await this.productService.update(id, updateProductDto);
    return {
      message: 'Produto atualizado com sucesso!',
      data: product,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.productService.remove(id);
    return {
      message: 'Produto deletado com sucesso!',
    };
  }
}
