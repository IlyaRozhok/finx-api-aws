import { Injectable, NotFoundException } from "@nestjs/common";
import { ReqOverviewDto } from "./dto";
import { UsersService } from "@/users/users.service";
import { DebtsService } from "@/debts/debt.service";
import { RecurringExpensesService } from "@/expenses/recurring-expenses.service";
import { InstallmentsService } from "@/installments/installments.service";
import { EventIncomesService } from "@/incomes/event-incomes/event-incomes.service";
import { RegularIncomesService } from "@/incomes/regular-incomes/regular-incomes.service";

@Injectable()
export class StatsService {
  constructor(
    private readonly usersService: UsersService,
    private readonly debtsService: DebtsService,
    private readonly expensesService: RecurringExpensesService,
    private readonly installmentsService: InstallmentsService,
    private readonly regularIncomesService: RegularIncomesService,
    private readonly eventIncomesService: EventIncomesService
  ) {}
  async getOverview(dto: ReqOverviewDto) {
    const user = await this.usersService.findById(dto.uid);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    const incomes = user.incomes;
    const debts = await this.debtsService.findAll(dto.uid);
    const expenses = await this.expensesService.getExpenses(dto.uid);
    const installments = await this.installmentsService.findAll(
      dto.uid
    );
    const totalMonthlyInstallments = installments.reduce((acc, i) => {
      acc += Number(i.monthlyPayment);
      return acc;
    }, 0);

    const totalMonthlyExpenses = expenses.reduce((acc, e) => {
      acc += Number(e.amount);
      return acc;
    }, 0);

    const totalMonthlyDebts = debts.reduce((acc, d) => {
      acc += Number(d.monthlyPayment);
      return acc;
    }, 0);

    const monthlyObligations =
      totalMonthlyInstallments + totalMonthlyExpenses + totalMonthlyDebts;

    const monthlyNetworth = incomes - monthlyObligations;

    return {
      incomes,
      debts,
      expenses,
      installments,
      monthlyNetworth: Math.floor(monthlyNetworth),
      monthlyObligations,
    };
  }

  async findAllIncomes(userId: string) {
    const [regular, events] = await Promise.all([
      this.regularIncomesService.getAll(userId),
      this.eventIncomesService.getAll(userId),
    ]);

    return { regular, events };
  }
}
