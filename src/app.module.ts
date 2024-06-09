import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionsModule } from './transactions/transactions.module';
import { PrismaModule } from './prisma/prisma.module';
import { PayablesModule } from './payables/payables.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    TransactionsModule,
    PrismaModule,
    PayablesModule,
    EventEmitterModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
