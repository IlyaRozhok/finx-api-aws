import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Accounts } from "@/entities/accounts.entity";
import { Repository } from "typeorm";
import { CreateAccountDto, AccountsResDto, SyncMonobankAccountDto } from "@/modules/accounts/dto";
import { plainToInstance } from "class-transformer";
import { MonobankService } from "@/modules/external/monobank/monobank.service";
import { TransactionsService } from "@/modules/transactions/transactions.service";

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Accounts)
    private readonly AccountRepository: Repository<Accounts>,
    private readonly monoIntegrationService: MonobankService,
    private readonly transactionsService: TransactionsService,
  ) {}

  async create(dto: CreateAccountDto, userId: string) {
    const newAccount = this.AccountRepository.create({ ...dto, userId });
    return await this.AccountRepository.save(newAccount);
  }

  async findAll(userId: string) {
    const accounts = await this.AccountRepository.find({
      where: {
        userId,
      },
      order: {
        type: "DESC",
      },
    });

    if (!accounts.length) {
      throw new NotFoundException("Accounts not found");
    }

    return plainToInstance(AccountsResDto, accounts, {
      excludeExtraneousValues: true,
    });
  }

  async findById(id: string) {
    const account = await this.AccountRepository.findOneBy({ id });
    if (!account) {
      throw new NotFoundException("Account not found");
    }
    return account;
  }

  async syncMonoStatement(dto: SyncMonobankAccountDto, userId: string) {
    const {from, to, accountId} = dto;
    
    const account = await this.AccountRepository.findOne({
      where: { id: accountId, userId },
    });
    
    if (!account) {
      throw new NotFoundException("Account not found");
    }
    
    if (!account.externalId) {
      throw new NotFoundException("Account externalId not found");
    }

    const statement = await this.monoIntegrationService.getStatement(
      from,
      to,
      account.externalId,
    );

    await this.transactionsService.syncMonobankTransactions(
      statement,
      account.id,
      userId,
    );
  }
}
