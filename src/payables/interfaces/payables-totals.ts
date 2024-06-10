import { Prisma } from '@prisma/client';

export interface PayableTotals {
  totalAvailable: Prisma.Decimal;
  totalWaitingFunds: Prisma.Decimal;
}
