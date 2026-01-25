import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OnboardingController } from "./onboarding.controller";
import { OnboardingService } from "./onboarding.service";
import { Category } from "@/entities/onboarding.entity";
import { UsersModule } from "@/modules/users/users.module";
import { User } from "@/entities/user.entity";
import { UsersService } from "@/modules/users/users.service";
import { RecurringExpensesModule } from "@/modules/plan/expenses/recurring-expenses.module";
import { RecurringExpense } from "@/entities/recurring-expense.entity";
import { InstallmentsModule } from "@/modules/plan/installments/installments.module";
import { Installment } from "@/entities/installment.entity";
import { Debt } from "@/entities/debt.entity";
import { DebtsModule } from "@/modules/plan/debts/debts.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Category,
      User,
      RecurringExpense,
      Installment,
      Debt,
    ]),
    UsersModule,
    RecurringExpensesModule,
    InstallmentsModule,
    DebtsModule,
  ],
  controllers: [OnboardingController],
  providers: [OnboardingService, UsersService],
  exports: [OnboardingService],
})
export class OnboadingModule {}
