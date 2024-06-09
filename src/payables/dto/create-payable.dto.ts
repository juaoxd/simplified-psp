import { Prisma } from '@prisma/client';

export class CreatePayableDto {
  amount: Prisma.Decimal;
  paymentMethod: string;
  transactionDate: Date;
  transactionId: string;
}
