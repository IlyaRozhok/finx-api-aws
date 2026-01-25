import { Injectable } from "@nestjs/common";
import { UsersService } from "@/modules/users/users.service";
import { DebtsService } from "@/modules/plan/debts/debt.service";
import { RecurringExpensesService } from "@/modules/plan/expenses/recurring-expenses.service";
import { InstallmentsService } from "@/modules/plan/installments/installments.service";
import { EventIncomesService } from "@/modules/plan/incomes/event-incomes/event-incomes.service";
import { RegularIncomesService } from "@/modules/plan/incomes/regular-incomes/regular-incomes.service";
import { TransactionsService } from "@/modules/transactions/transactions.service";
import { plainToInstance } from "class-transformer";
import { ResRegularIncomesDto } from "@/modules/plan/incomes/regular-incomes/dto";
import { EventIncomeResDto } from "@/modules/plan/incomes/event-incomes/dto";
import { normalizeAccountOverviewResponse } from "@/modules/stats/libs/normalizeAccountOverviewResponse";

@Injectable()
export class StatsService {
  constructor(
    private readonly usersService: UsersService,
    private readonly debtsService: DebtsService,
    private readonly expensesService: RecurringExpensesService,
    private readonly installmentsService: InstallmentsService,
    private readonly regularIncomesService: RegularIncomesService,
    private readonly eventIncomesService: EventIncomesService,
    private readonly transactionsService: TransactionsService
  ) {}


  async findAllIncomes(userId: string) {
    const [regular, events] = await Promise.all([
      this.regularIncomesService.getAll(userId),
      this.eventIncomesService.getAll(userId),
    ]);

    const regularDto = plainToInstance(ResRegularIncomesDto, regular, {
      excludeExtraneousValues: true,
    });

    const eventsDto = plainToInstance(EventIncomeResDto, events, {
      excludeExtraneousValues: true,
    });

    return { regular: regularDto, events: eventsDto };
  }

  async accountOverview (userId: string, accountId: string) {
    const incomes = await this.regularIncomesService.getAll(userId);
    const thisMonthTransactions = await this.transactionsService.findThisMonthExpensesByAccount(userId, accountId)
    const allTransactions = await this.transactionsService.findAllTransactions(userId)
    const installments = await this.installmentsService.findAll(userId)
    const {incomeSummary, monthlyIncomes, monthlyBalance} = normalizeAccountOverviewResponse(allTransactions, incomes)


    return {
      balance: monthlyBalance,
      monthlyExpenses: thisMonthTransactions,
      monthlyIncomes: monthlyIncomes,
      incomeSummary,
      installments,
    };
  }

  async dashboardOverview (userId: string) {

    const thisMonthTransactions = await this.transactionsService.findThisMonthExpenses(userId);



  }
}
