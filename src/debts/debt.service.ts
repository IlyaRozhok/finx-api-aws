import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Debt } from "../entities/debt.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateDebtDto, CreateDebtsDto } from "./dto";

@Injectable()
export class DebtsService {
  constructor(
    @InjectRepository(Debt)
    private readonly DebtsRepository: Repository<Debt>
  ) {}

  async findAll(uid: string) {
    if (!uid) {
      throw new BadRequestException("User id not provided");
    }
    const debts = await this.DebtsRepository.find({
      where: {
        userId: uid,
      },
    });
    return debts;
  }

  async createMany(dto: CreateDebtsDto[]): Promise<Debt[]> {
    if (!dto.length) {
      throw new BadRequestException("Payload did not provided");
    }
    const debts = dto.map((d) =>
      this.DebtsRepository.create({
        //@ts-ignore
        userId: d.userId,
        description: d.description ?? null,
        interest: Number(d.interest),
        totalDebt: Number(d.totalDebt),
        debtType: "credit_card",
        monthlyPayment: (Number(d.totalDebt) * Number(d.interest)) / 100,
        isClosed: false,
      })
    );

    return await this.DebtsRepository.save(debts);
  }

  async update(id: string, dto: CreateDebtsDto): Promise<Debt> {
    if (!id) {
      throw new BadRequestException("Debt id not provided");
    }

    const debt = await this.DebtsRepository.findOne({ where: { id } });

    if (!debt) {
      throw new NotFoundException(`Debt with id ${id} not found`);
    }

    debt.description = dto.description ?? debt.description;
    debt.interest = dto.interest ? String(Number(dto.interest)) : debt.interest;
    debt.totalDebt = dto.totalDebt
      ? String(Number(dto.totalDebt))
      : debt.totalDebt;
    debt.monthlyPayment =
      debt.totalDebt && debt.interest
        ? String((Number(debt.totalDebt) * Number(debt.interest)) / 100)
        : debt.monthlyPayment;

    return await this.DebtsRepository.save(debt);
  }

  async create(dto: CreateDebtDto, userId: string) {
    const debt = this.DebtsRepository.create({
      //@ts-ignore
      userId,
      description: dto.description ?? null,
      interest: Number(dto.interest),
      totalDebt: Number(dto.totalDebt),
      debtType: "credit_card",
      monthlyPayment: (Number(dto.totalDebt) * Number(dto.interest)) / 100,
      isClosed: false,
    });

    return await this.DebtsRepository.save(debt);

  }

  async delete(id: string) {
    if (!id) {
      throw new BadRequestException("Debt id not provided");
    }
    const debt = await this.DebtsRepository.findBy({ id });

    if (!debt) {
      throw new NotFoundException(`Debt with id ${id} not found`);
    }

    await this.DebtsRepository.remove(debt);

    return debt;
  }
}
