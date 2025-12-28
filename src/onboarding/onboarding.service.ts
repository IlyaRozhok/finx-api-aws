import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Category } from "../entities/onboarding.entity";
import { UsersService } from "@/users/users.service";
import { RecurringExpensesService } from "@/expenses/recurring-expenses.service";
import { InstallmentsService } from "@/installments/installments.service";
import { DebtsService } from "@/debts/debt.service";

@Injectable()
export class OnboardingService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly usersService: UsersService,
    private readonly expenseService: RecurringExpensesService,
    private readonly installmentsService: InstallmentsService,
    private readonly debtsService: DebtsService
  ) {}

  async setCategories(dto: Category[]) {
    const categories = this.categoryRepository.create(dto);
    return await this.categoryRepository.save(categories);
  }

  async getCategories() {
    const categories = await this.categoryRepository.find();
    return categories;
  }

  async getSummary(uid: string) {
    const user = await this.usersService.findById(uid);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const expenses = await this.expenseService.getExpenses(uid);
    const installmnets = await this.installmentsService.findAll(uid);
    const debts = await this.debtsService.findAll(uid);
    const resData = {
      currency: user.currency,
      incomes: user.incomes,
      isOnboarded: user.isOnboarded,
      expenses,
      installmnets,
      debts,
    };

    const isOnboardingCompleted =
      resData.currency &&
      resData.incomes > 0 &&
      resData.debts?.length > 0 &&
      resData.expenses?.length > 0 &&
      resData.installmnets?.length > 0;

    return resData;
  }
}
