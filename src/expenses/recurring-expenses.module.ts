import { Module } from "@nestjs/common";
import { RecurringExpensesService } from "./recurring-expenses.service";
import { RecurringExpensesController } from "./recurring-expenses.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RecurringExpense } from "../entities/recurring-expense.entity";

@Module({
  imports: [TypeOrmModule.forFeature([RecurringExpense])],
  controllers: [RecurringExpensesController],
  providers: [RecurringExpensesService],
  exports: [RecurringExpensesService],
})
export class RecurringExpensesModule {}
