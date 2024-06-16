import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
  ) {}

  findAll(): Promise<Review[]> {
    return this.reviewRepository.find();
  }

  findOne(id: number): Promise<Review> {
    return this.reviewRepository.findOneBy({ id });
  }

  async create(createReviewDto: CreateReviewDto): Promise<Review> {
    const review = this.reviewRepository.create(createReviewDto);
    return this.reviewRepository.save(review);
  }

  async update(id: number, updateReviewDto: UpdateReviewDto): Promise<Review> {
    await this.reviewRepository.update(id, updateReviewDto);
    return this.reviewRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.reviewRepository.delete(id);
  }
}

