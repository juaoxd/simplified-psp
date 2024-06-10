import { Injectable } from '@nestjs/common';
import { CreatePayableDto } from './dto/create-payable.dto';
import { UpdatePayableDto } from './dto/update-payable.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PayableEntity } from './entities/payable.entity';
import { OnEvent } from '@nestjs/event-emitter';
import { Prisma } from '@prisma/client';
import { PayableTotals } from './interfaces/payables-totals';

@Injectable()
export class PayablesService {
  constructor(private prisma: PrismaService) {}

  @OnEvent('transaction.created', { async: true })
  async create(createPayableDto: CreatePayableDto) {
    const { amount, paymentMethod, transactionDate, transactionId } =
      createPayableDto;

    let status = 'paid';
    let fee = 0.03;
    const paymentDate = new Date(transactionDate);

    if (paymentMethod === 'credit_card') {
      status = 'waiting_funds';
      fee = 0.05;
      paymentDate.setDate(paymentDate.getDate() + 30);
    }

    const netAmount = amount.minus(amount.times(fee));

    const payable = new PayableEntity(
      status,
      amount,
      netAmount,
      paymentDate,
      transactionId,
    );

    await this.prisma.payable.create({
      data: payable,
    });
  }

  async findAll(): Promise<PayableEntity[]> {
    return await this.prisma.payable.findMany();
  }

  async getPayableTotals(): Promise<PayableTotals> {
    const payables = await this.findAll();

    let totalAvailable = new Prisma.Decimal(0);
    let totalWaitingFunds = new Prisma.Decimal(0);

    payables.forEach((payable) => {
      if (payable.status === 'paid') {
        totalAvailable = totalAvailable.plus(payable.netAmount);
      } else {
        totalWaitingFunds = totalWaitingFunds.plus(payable.netAmount);
      }
    });

    return {
      totalAvailable,
      totalWaitingFunds,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} payable`;
  }

  update(id: number, updatePayableDto: UpdatePayableDto) {
    return `This action updates a #${id} payable`;
  }

  remove(id: number) {
    return `This action removes a #${id} payable`;
  }
}
