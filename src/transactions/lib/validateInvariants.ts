import { BadRequestException } from "@nestjs/common";
import { isValid, parseISO } from "date-fns";
import { TransactionDirection, TransactionType } from "@/transactions/types";
import { CreateTransactionDto } from "@/transactions/dto";

const err = (msg: string) => {
  throw new BadRequestException(msg);
};

export const validateInvariants = (dto: CreateTransactionDto) => {
  const {
    direction,
    debtId,
    installmentId,
    categoryId,
    type,
    occurredAt,
    amount,
  } = dto;


  const dt = parseISO(occurredAt);
  if (!isValid(dt)) err("occurredAt must be a valid ISO date");
  if (dt.getTime() > Date.now()) err("Transaction cannot be in the future");

  const n = Number(amount);
  if (!Number.isFinite(n)) err("amount must be a number");
  if (n <= 0) err("amount must be greater than 0");

  // helpers
  const has = {
    category: !!categoryId,
    installment: !!installmentId,
    debt: !!debtId,
  };

  const refsCount = [has.category, has.installment, has.debt].filter(
    Boolean,
  ).length;

  const requireOnly = (
    expected: "none" | "category" | "installment" | "debt",
  ) => {
    if (expected === "none") {
      if (refsCount !== 0)
        err(
          "This transaction type must not reference category/debt/installment",
        );
      return;
    }
    if (refsCount !== 1)
      err("Exactly one of categoryId/installmentId/debtId must be provided");
    if (!has[expected]) err(`This transaction type requires ${expected}Id`);
  };

  switch (type) {
    case TransactionType.CATEGORY_BASED: {
      requireOnly("category");
      break;
    }

    case TransactionType.INSTALLMENT_PAYMENT: {
      requireOnly("installment");
      if (direction !== TransactionDirection.EXPENSE) {
        err("INSTALLMENT_PAYMENT must have direction=expense");
      }
      break;
    }

    case TransactionType.DEBT_PAYMENT: {
      requireOnly("debt");
      if (direction !== TransactionDirection.EXPENSE) {
        err("DEBT_PAYMENT must have direction=expense");
      }
      break;
    }

    case TransactionType.TRANSFER: {
      requireOnly("none");
      break;
    }

    case TransactionType.INCOME_REGULAR:
    case TransactionType.INCOME_EVENT: {
      if (direction !== TransactionDirection.INCOME)
        err(`${type} must have direction=income`);
      if (has.debt || has.installment)
        err(`${type} must not reference debt/installment`);
      break;
    }

    default:
      err("Unknown transaction type");
  }
};
