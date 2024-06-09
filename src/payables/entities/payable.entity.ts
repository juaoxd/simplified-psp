import { Payable, Prisma } from '@prisma/client';

export class PayableEntity implements Payable {
  id: string;
  status: string;
  grossAmount: Prisma.Decimal;
  netAmount: Prisma.Decimal;
  paymentDate: Date;
  transactionId: string;

  constructor(
    status: string,
    grossAmount: Prisma.Decimal,
    netAmount: Prisma.Decimal,
    paymentDate: Date,
    transactionId: string,
  ) {
    this.status = status;
    this.grossAmount = grossAmount;
    this.netAmount = netAmount;
    this.paymentDate = paymentDate;
    this.transactionId = transactionId;
  }
}
