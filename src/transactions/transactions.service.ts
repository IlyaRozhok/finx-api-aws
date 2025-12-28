import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Transaction } from "@/entities/transaction.entity";
import { validateInvariants } from "@/transactions/lib/validateInvariants";
import { CreateTransactionDto } from "@/transactions/dto";

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}

  async create(dto: CreateTransactionDto, userId: string) {
    validateInvariants(dto);
    const transaction = this.transactionRepository.create({ ...dto, userId });
    return await this.transactionRepository.save(transaction)
  }

  async getTransactions(userId: string) {
    const transactions = await this.transactionRepository.find({where: {userId}, order: {occurredAt: "DESC"}})
    if (!transactions) {
      throw new NotFoundException("Transactions not found")
    }
    return transactions;

  }

  async delete(userId: string, id: string) {
    const res = await this.transactionRepository.delete({userId, id})

    if (res.affected === 0) {
      throw new NotFoundException("Transaction not found")
    }

    return true;
  }
}
