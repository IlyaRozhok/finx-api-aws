import { RegularIncomes } from "@/entities/incomes/income-regular.entity";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateRegularIncomeDto, UpdateRegularIncomeDto } from "./dto";

@Injectable()
export class RegularIncomesService {
  constructor(
    @InjectRepository(RegularIncomes)
    private readonly regularIncomesRepository: Repository<RegularIncomes>
  ) {}

  async getAll(userId: string) {
    return await this.regularIncomesRepository.find({
      where: {
        userId,
      },
    });
  }

  async create(
    userId: string,
    dto: CreateRegularIncomeDto
  ): Promise<RegularIncomes> {
    const income = this.regularIncomesRepository.create({
      userId,
      amount: dto.amount,
      description: dto.description,
    });

    return await this.regularIncomesRepository.save(income);
  }

  async findOne(userId: string, id: string) {
    const income = await this.regularIncomesRepository.findOne({
      where: { id, userId },
    });

    if (!income) {
      throw new NotFoundException("Regular income not found");
    }

    return income;
  }

  async delete(userId: string, id: string) {
    const result = await this.regularIncomesRepository.delete({ userId, id });
    if (result.affected === 0) {
      throw new NotFoundException("Regular income not found");
    }
  }

  async update(userId: string, id: string, dto: UpdateRegularIncomeDto) {
    const income = await this.findOne(userId, id);
    Object.assign(income, dto);
    return await this.regularIncomesRepository.save(income);
  }
}
