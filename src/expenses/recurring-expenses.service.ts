import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateExpenseDto, CreateRecurringExpenseDto, UpdateExpenseDto } from "./dto";
import { RecurringExpense } from "../entities/recurring-expense.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class RecurringExpensesService {
  constructor(
    @InjectRepository(RecurringExpense)
    private readonly RecurringExpensesRepository: Repository<RecurringExpense>,
  ) {}

  async updateExpenses(dto: CreateRecurringExpenseDto[]) {
    const userId = dto[0]?.userId;
    if (!userId) {
      throw new BadRequestException("User ID is required");
    }

    const results: RecurringExpense[] = [];

    for (const expenseDto of dto) {
      if (expenseDto.id) {
        const existingExpense = await this.RecurringExpensesRepository.findOne({
          where: { id: expenseDto.id, userId },
        });

        if (existingExpense) {
          existingExpense.categoryId = expenseDto.categoryId;
          existingExpense.amount = expenseDto.amount;
          existingExpense.description = expenseDto.description || "";
          results.push(
            await this.RecurringExpensesRepository.save(existingExpense),
          );
        } else {
          const newExpense =
            this.RecurringExpensesRepository.create(expenseDto);
          results.push(await this.RecurringExpensesRepository.save(newExpense));
        }
      } else {
        const newExpense = this.RecurringExpensesRepository.create(expenseDto);
        results.push(await this.RecurringExpensesRepository.save(newExpense));
      }
    }

    return results;
  }

  async createExpense(dto: CreateExpenseDto, userId: string) {
    const newExpense = this.RecurringExpensesRepository.create({
      ...dto,
      userId,
    });
    return this.RecurringExpensesRepository.save(newExpense);
  }

  async getExpenses(uid: string) {
    if (!uid) {
      throw new BadRequestException("User id not provided");
    }
    const expenses = await this.RecurringExpensesRepository.find({
      where: {
        userId: uid,
      },
      relations: ["category"],
    });

    return expenses;
  }

  async deleteExpense(expenseId: string) {
    return await this.RecurringExpensesRepository.delete({
      id: expenseId,
    });
  }

  async updateExpense(dto: UpdateExpenseDto, userId: string, id: string) {
    const expense = await this.RecurringExpensesRepository.findOne({
      where: { userId, id },
    });
    Object.assign(expense, dto)
    return await this.RecurringExpensesRepository.save(expense);
  }
}
