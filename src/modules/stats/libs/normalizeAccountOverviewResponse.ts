import { TransactionsResDto } from "@/modules/transactions/dto";
import { TransactionDirection } from "@/modules/transactions/types";

export const normalizeAccountOverviewResponse = (
  allTransactions: TransactionsResDto[],
  incomes: any
) => {
  const incomeSummary = incomes.flat().reduce((acc, i) => {
    return (acc += i.amount);
  }, 0);

  const incomeMonthlyExpenses = incomes.reduce((acc, i) => (acc += +i.amount), 0);

  const monthlyIncomes = allTransactions
    .filter((t) => t.direction === TransactionDirection.INCOME)
    .reduce((acc, i) => (acc += +i.amount), 0);

  const monthlyBalance = incomeSummary - incomeMonthlyExpenses;

  return {incomeSummary, monthlyIncomes, monthlyBalance}
};
