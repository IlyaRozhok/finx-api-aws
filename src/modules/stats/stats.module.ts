import { Module } from "@nestjs/common";
import { StatsService } from "./stats.service";
import { StatsController } from "./stats.controller";
import { UsersModule } from "@/modules/users/users.module";
import { DebtsModule } from "@/modules/plan/debts/debts.module";
import { RecurringExpensesModule } from "@/modules/plan/expenses/recurring-expenses.module";
import { InstallmentsModule } from "@/modules/plan/installments/installments.module";
import { EventIncomesModule } from "@/modules/plan/incomes/event-incomes/event-incomes.module";
import { RegularIncomesModule } from "@/modules/plan/incomes/regular-incomes/regular-incomes.module";
import { TransactionsModule } from "@/modules/transactions/transactions.module";

@Module({
  controllers: [StatsController],
  providers: [StatsService],
  imports: [
    UsersModule,
    DebtsModule,
    RecurringExpensesModule,
    InstallmentsModule,
    RegularIncomesModule,
    EventIncomesModule,
    TransactionsModule
  ],
})
export class StatsModule {}
