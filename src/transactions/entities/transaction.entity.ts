import { Transaction, Prisma } from '@prisma/client';

export class TransactionEntity implements Transaction {
  id: string;
  amount: Prisma.Decimal;
  description: string;
  paymentMethod: string;
  cardNumber: string;
  cardHolderName: string;
  cardExpirationDate: string;
  cardCvv: string;
  createdAt: Date;
  updatedAt: Date;
}
