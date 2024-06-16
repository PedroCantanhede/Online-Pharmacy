export class CreatePaymentDto {
  orderId: number;
  paymentMethod: string;
  amount: number;
  paymentStatus: string;
}

