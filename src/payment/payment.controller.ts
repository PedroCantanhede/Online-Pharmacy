import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get()
  async findAll() {
    const payments = await this.paymentService.findAll();
    return {
      message: 'Pagamentos encontrados com sucesso!',
      data: payments,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const payment = await this.paymentService.findOne(id);
    return {
      message: 'Pagamento encontrado com sucesso!',
      data: payment,
    };
  }

  @Post()
  async create(@Body() createPaymentDto: CreatePaymentDto) {
    const payment = await this.paymentService.create(createPaymentDto);
    return {
      message: 'Pagamento criado com sucesso!',
      data: payment,
    };
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updatePaymentDto: UpdatePaymentDto) {
    const payment = await this.paymentService.update(id, updatePaymentDto);
    return {
      message: 'Pagamento atualizado com sucesso!',
      data: payment,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.paymentService.remove(id);
    return {
      message: 'Pagamento deletado com sucesso!',
    };
  }
}

