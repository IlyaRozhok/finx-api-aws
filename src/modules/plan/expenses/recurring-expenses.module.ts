import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RecurringExpensesController } from "./recurring-expenses.controller";
import { RecurringExpensesService } from "./recurring-expenses.service";
import { RecurringExpense } from "@/entities/recurring-expense.entity";

@Module({
  imports: [TypeOrmModule.forFeature([RecurringExpense])],
  controllers: [RecurringExpensesController],
  providers: [RecurringExpensesService],
  exports: [RecurringExpensesService],
})
export class RecurringExpensesModule {}
