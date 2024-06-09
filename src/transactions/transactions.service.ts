import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Transaction } from '@prisma/client';
import { CreatePayableDto } from 'src/payables/dto/create-payable.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class TransactionsService {
  constructor(
    private prisma: PrismaService,
    private eventEmitter: EventEmitter2,
  ) {}

  async create(createTransactionDto: CreateTransactionDto): Promise<void> {
    const {
      amount,
      description,
      paymentMethod,
      cardNumber,
      cardHolderName,
      cardExpirationDate,
      cardCvv,
    } = createTransactionDto;

    const cardNumberMasked = cardNumber.slice(-4);

    const transaction = await this.prisma.transaction.create({
      data: {
        amount,
        description,
        paymentMethod,
        cardNumber: cardNumberMasked,
        cardHolderName,
        cardExpirationDate,
        cardCvv,
      },
    });

    const payableDto: CreatePayableDto = {
      amount: transaction.amount,
      paymentMethod: transaction.paymentMethod,
      transactionDate: transaction.createdAt,
      transactionId: transaction.id,
    };

    this.eventEmitter.emit('transaction.created', payableDto);
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
