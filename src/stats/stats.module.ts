import { Module } from "@nestjs/common";
import { StatsService } from "./stats.service";
import { StatsController } from "./stats.controller";
import { UsersModule } from "@/users/users.module";
import { DebtsModule } from "@/debts/debts.module";
import { RecurringExpensesModule } from "@/expenses/recurring-expenses.module";
import { InstallmentsModule } from "@/installments/installments.module";
import { EventIncomesModule } from "@/incomes/event-incomes/event-incomes.module";
import { RegularIncomesModule } from "@/incomes/regular-incomes/regular-incomes.module";

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
  ],
})
export class StatsModule {}
