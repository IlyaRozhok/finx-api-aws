import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateExpenseDto, CreateRecurringExpenseDto, ExpensesResDto, UpdateExpenseDto } from "./dto";
import { RecurringExpense } from "@/entities/recurring-expense.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { plainToInstance } from "class-transformer";

@Injectable()
export class RecurringExpensesService {
  constructor(
    @InjectRepository(RecurringExpense)
    private readonly recurringExpenseRepository: Repository<RecurringExpense>
  ) {}

  async updateExpenses(expenses: RecurringExpense[]): Promise<RecurringExpense[]> {
    return await this.recurringExpenseRepository.save(expenses);
  }

  async getExpenses(userId: string): Promise<ExpensesResDto[]> {
    const expenses = await this.recurringExpenseRepository.find({
      where: { userId },
    });

    return plainToInstance(ExpensesResDto, expenses, {
      excludeExtraneousValues: true,
    });
  }

  async deleteExpense(id: string): Promise<void> {
    await this.recurringExpenseRepository.delete({ id });
  }

  async createExpense(dto: CreateExpenseDto, userId: string): Promise<ExpensesResDto> {
    const expense = this.recurringExpenseRepository.create({
      ...dto,
      userId,
    });

    const savedExpense = await this.recurringExpenseRepository.save(expense);

    return plainToInstance(ExpensesResDto, savedExpense, {
      excludeExtraneousValues: true,
    });
  }

  async updateExpense(dto: UpdateExpenseDto, userId: string, id: string): Promise<ExpensesResDto> {
    const expense = await this.recurringExpenseRepository.findOne({
      where: { id, userId },
    });

    if (!expense) {
      throw new BadRequestException("Expense not found");
    }

    Object.assign(expense, dto);
    const updatedExpense = await this.recurringExpenseRepository.save(expense);

    return plainToInstance(ExpensesResDto, updatedExpense, {
      excludeExtraneousValues: true,
    });
  }
}
