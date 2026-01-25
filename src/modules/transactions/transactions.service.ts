import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Between, Repository } from "typeorm";
import { Transaction } from "@/entities/transaction.entity";
import { validateInvariants } from "@/modules/transactions/lib/validateInvariants";
import {
  CreateTransactionDto,
  TransactionsResDto,
} from "@/modules/transactions/dto";
import { TransactionDirection } from "@/modules/transactions/types";
import { plainToInstance } from "class-transformer";
import { endOfMonth, startOfMonth } from "date-fns";
import { Statement } from "@/modules/external/monobank/dto";
import { normalizeMonobankTransactions } from "@/modules/transactions/lib/normalizeMonobankTransactions";

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}

  async create(dto: CreateTransactionDto, userId: string) {
    validateInvariants(dto);
    const transaction = this.transactionRepository.create({ ...dto, userId });
    return await this.transactionRepository.save(transaction);
  }

  async findAllTransactions(userId: string) {
    const transactions = await this.transactionRepository.find({
      where: { userId },
      order: { occurredAt: "DESC" },
    });
    if (!transactions) {
      throw new NotFoundException("Transactions not found");
    }
    return plainToInstance(TransactionsResDto, transactions, {
      excludeExtraneousValues: true,
    });
  }

  async findThisMonthExpensesByAccount(userId: string, accountId: string) {
    const now = new Date();
    const monthStart = startOfMonth(now);
    const monthEnd = endOfMonth(now);

    const expenses = await this.transactionRepository.find({
      where: {
        occurredAt: Between(monthStart, monthEnd),
        userId,
        accountId,
        direction: TransactionDirection.EXPENSE,
      },
      order: {
        occurredAt: "DESC",
      },
    });

    if (!expenses.length) {
      throw new NotFoundException(
        "This month expense transactions by account not found.",
      );
    }

    return plainToInstance(TransactionsResDto, expenses, {
      excludeExtraneousValues: true,
    });
  }

  async findThisMonthExpenses(userId: string) {
    const now = new Date();
    const monthStart = startOfMonth(now);
    const monthEnd = endOfMonth(now);

    const expenses = await this.transactionRepository.find({
      where: {
        occurredAt: Between(monthStart, monthEnd),
        userId,
        direction: TransactionDirection.EXPENSE,
      },
      order: {
        occurredAt: "DESC",
      },
    });

    if (!expenses.length) {
      throw new NotFoundException("This month expense transactions not found.");
    }

    return plainToInstance(TransactionsResDto, expenses, {
      excludeExtraneousValues: true,
    });
  }

  async delete(userId: string, id: string) {
    const res = await this.transactionRepository.delete({ userId, id });
    if (res.affected === 0) {
      throw new NotFoundException("Transaction not found");
    }
    return true;
  }

  async syncMonobankTransactions(statement: Statement[], accountId: string, userId: string) {

    const transactions = normalizeMonobankTransactions(statement, accountId, userId);
    await this.transactionRepository.upsert(transactions, {
      conflictPaths: ["userId", "provider", "externalId"],
    });
  };
}
