import { Prisma } from '@prisma/client';

export class CreateTransactionDto {
  amount: Prisma.Decimal;
  description: string;
  paymentMethod: string;
  cardNumber: string;
  cardHolderName: string;
  cardExpirationDate: string;
  cardCvv: string;
}
