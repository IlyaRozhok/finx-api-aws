import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { Installment } from "../entities/installment.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateInstallmentDto, UpdateInstallmentDto } from "./dto";
import { addMonths, format, parseISO } from "date-fns";
import { generateInstallment } from "@/installments/lib/generateInstallment";

@Injectable()
export class InstallmentsService {
  constructor(
    @InjectRepository(Installment)
    private readonly installmentRepository: Repository<Installment>,
  ) {}

  async findAll(uid: string): Promise<Installment[]> {
    if (!uid) {
      throw new BadRequestException("User id not provided");
    }
    const installments = await this.installmentRepository.find({
      where: {
        userId: uid,
      },
    });

    return installments;
  }

  async createInstallment(dto: CreateInstallmentDto, userId: string) {
    const entity = generateInstallment(dto, userId);
    const installmentEntity = this.installmentRepository.create(entity);
    return await this.installmentRepository.save(installmentEntity);
  }

  async update(dto: UpdateInstallmentDto, userId: string, id: string) {
    const currentInstallment = await this.installmentRepository.findOne({
      where: { id, userId },
    });
    if (!currentInstallment)
      throw new NotFoundException("Installment not found");
    Object.assign(currentInstallment, dto);
    const updatedInstallment = generateInstallment(currentInstallment, userId);

    Object.assign(currentInstallment, updatedInstallment);

    return this.installmentRepository.save(currentInstallment);
  }

  async delete(id: string, userId: string) {
    const result = await this.installmentRepository.delete({ id, userId });

    if (result.affected === 0) {
      throw new NotFoundException("Installment not found");
    }
  }
}
