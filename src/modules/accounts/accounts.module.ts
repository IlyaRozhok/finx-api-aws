import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Accounts } from "@/entities/accounts.entity";
import { Transaction } from "@/entities/transaction.entity";
import { MonobankModule } from "@/modules/external/monobank/monobank.module";
import { TransactionsModule } from "@/modules/transactions/transactions.module";

@Module({
  imports: [TypeOrmModule.forFeature([Accounts, Transaction]), MonobankModule, TransactionsModule],
  controllers: [AccountsController],
  providers: [AccountsService],
  exports: [AccountsService],
})
export class AccountsModule {}