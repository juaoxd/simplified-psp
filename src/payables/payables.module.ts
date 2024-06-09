import { Module } from '@nestjs/common';
import { PayablesService } from './payables.service';
import { PayablesController } from './payables.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [PayablesController],
  providers: [PayablesService],
  imports: [PrismaModule],
})
export class PayablesModule {}
