import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
  ) {}

  findAll(): Promise<Payment[]> {
    return this.paymentRepository.find();
  }

  findOne(id: number): Promise<Payment> {
    return this.paymentRepository.findOneBy({ id });
  }

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const payment = this.paymentRepository.create(createPaymentDto);
    return this.paymentRepository.save(payment);
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto): Promise<Payment> {
    await this.paymentRepository.update(id, updatePaymentDto);
    return this.paymentRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.paymentRepository.delete(id);
  }
}
