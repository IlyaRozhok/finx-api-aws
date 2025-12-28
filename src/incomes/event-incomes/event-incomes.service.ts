import { Injectable, NotFoundException } from "@nestjs/common";
import { EventIncomeDto } from "./dto";
import { EventIncomes } from "@/entities/incomes/income-event.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class EventIncomesService {
  @InjectRepository(EventIncomes)
  private readonly eventIncomesRepository: Repository<EventIncomes>;

  async delete(userId: string, id: string) {
    const result = await this.eventIncomesRepository.delete({ userId, id });
    if (result.affected === 0) {
      throw new NotFoundException("Event income not found");
    }
  }

  async getAll(userId: string) {
    return await this.eventIncomesRepository.find({
      where: {
        userId,
      },
    });
  }

  async findOne(userId: string, id: string) {
    const income = await this.eventIncomesRepository.findOne({
      where: {
        userId,
        id,
      },
    });

    if (!income) {
      throw new NotFoundException("Event income not found");
    }

    return income;
  }

  async update(userId: string, id: string, dto: EventIncomeDto) {
    const income = await this.eventIncomesRepository.findOne({
      where: {
        userId,
        id,
      },
    });

    Object.assign(income, dto);

    return await this.eventIncomesRepository.save(income);
  }

  async create(userId: string, dto: EventIncomeDto): Promise<EventIncomes> {
    const income = this.eventIncomesRepository.create({
      userId,
      amount: dto.amount,
      description: dto.description,
      date: dto.date,
    });

    return await this.eventIncomesRepository.save(income);
  }
}
