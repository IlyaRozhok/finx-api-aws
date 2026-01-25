import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Debt } from "@/entities/debt.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateDebtDto, CreateDebtsDto, UpdateDebtDto, DebtResDto } from "./dto";
import { plainToInstance } from "class-transformer";

@Injectable()
export class DebtsService {
  constructor(
    @InjectRepository(Debt)
    private readonly debtRepository: Repository<Debt>
  ) {}

  async findAll(userId: string): Promise<DebtResDto[]> {
    const debts = await this.debtRepository.find({
      where: { userId },
    });

    return plainToInstance(DebtResDto, debts, {
      excludeExtraneousValues: true,
    });
  }

  async create(userId: string, dto: CreateDebtDto): Promise<DebtResDto> {
    const debt = this.debtRepository.create({
      ...dto,
      userId,
    });

    const savedDebt = await this.debtRepository.save(debt);

    return plainToInstance(DebtResDto, savedDebt, {
      excludeExtraneousValues: true,
    });
  }

  async update(userId: string, id: string, dto: UpdateDebtDto): Promise<DebtResDto> {
    const debt = await this.debtRepository.findOne({
      where: { id, userId },
    });

    if (!debt) {
      throw new NotFoundException("Debt not found");
    }

    Object.assign(debt, dto);
    const updatedDebt = await this.debtRepository.save(debt);

    return plainToInstance(DebtResDto, updatedDebt, {
      excludeExtraneousValues: true,
    });
  }

  async delete(userId: string, id: string): Promise<void> {
    const result = await this.debtRepository.delete({ id, userId });

    if (result.affected === 0) {
      throw new NotFoundException("Debt not found");
    }
  }
}
