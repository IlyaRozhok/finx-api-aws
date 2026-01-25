import { Statement } from "@/modules/external/monobank/dto";
import { TransactionsResDto } from "@/modules/transactions/dto";
import { AccountProvider } from "@/shared/enums";
import { TransactionDirection, TransactionType } from "@/modules/transactions/types";

export const normalizeMonobankTransactions = (
  statement: Statement[],
  accountId: string,
  userId: string,
): TransactionsResDto[] => {
  return statement.map((t) => {
    return {
      externalId: t.id,
      amount: Math.abs(t.amount / 100).toFixed(2),
      provider: AccountProvider.MONOBANK,
      note: t.description,
      accountId,
      direction:
        t.amount < 0
          ? TransactionDirection.EXPENSE
          : TransactionDirection.INCOME,
      type: TransactionType.CATEGORY_BASED,
      occurredAt: new Date(t.time * 1000).toISOString(),
      categoryId: null,
      debtId: null,
      installmentId: null,
      userId,
    };
  });
};