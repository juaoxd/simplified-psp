import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Transaction } from '@prisma/client';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  create(createTransactionDto: CreateTransactionDto) {
    const {
      amount,
      description,
      paymentMethod,
      cardNumber,
      cardHolderName,
      cardExpirationDate,
      cardCvv,
    } = createTransactionDto;

    return this.prisma.transaction.create({
      data: {
        amount,
        description,
        paymentMethod,
        cardNumber,
        cardHolderName,
        cardExpirationDate,
        cardCvv,
      },
    });
  }

  async findAll(): Promise<Transaction[]> {
    return await this.prisma.transaction.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
