import { Injectable } from '@nestjs/common';
import { CreatePayableDto } from './dto/create-payable.dto';
import { UpdatePayableDto } from './dto/update-payable.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PayableEntity } from './entities/payable.entity';
import { OnEvent } from '@nestjs/event-emitter';
import { Prisma } from '@prisma/client';

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

    const netAmount = new Prisma.Decimal(Number(amount) - Number(amount) * fee);

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

  findAll() {
    return `This action returns all payables`;
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
