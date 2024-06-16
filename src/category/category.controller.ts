import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAll() {
    const categories = await this.categoryService.findAll();
    return {
      message: 'Categorias encontradas com sucesso!',
      data: categories,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const category = await this.categoryService.findOne(id);
    return {
      message: 'Categoria encontrada com sucesso!',
      data: category,
    };
  }

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    const category = await this.categoryService.create(createCategoryDto);
    return {
      message: 'Categoria criada com sucesso!',
      data: category,
    };
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryService.update(id, updateCategoryDto);
    return {
      message: 'Categoria atualizada com sucesso!',
      data: category,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.categoryService.remove(id);
    return {
      message: 'Categoria deletada com sucesso!',
    };
  }
}
