import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  async findAll() {
    const reviews = await this.reviewService.findAll();
    return {
      message: 'Avaliações encontradas com sucesso!',
      data: reviews,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const review = await this.reviewService.findOne(id);
    return {
      message: 'Avaliação encontrada com sucesso!',
      data: review,
    };
  }

  @Post()
  async create(@Body() createReviewDto: CreateReviewDto) {
    const review = await this.reviewService.create(createReviewDto);
    return {
      message: 'Avaliação criada com sucesso!',
      data: review,
    };
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateReviewDto: UpdateReviewDto) {
    const review = await this.reviewService.update(id, updateReviewDto);
    return {
      message: 'Avaliação atualizada com sucesso!',
      data: review,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.reviewService.remove(id);
    return {
      message: 'Avaliação deletada com sucesso!',
    };
  }
}

