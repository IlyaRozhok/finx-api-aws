import { CreateInstallmentDto } from "@/installments/dto";
import { BadRequestException } from "@nestjs/common";
import { addMonths, format, parseISO } from "date-fns";
import { BANK_INTEREST } from "@/shared/categories";

export const generateInstallment = (dto: CreateInstallmentDto, userId: string) => {
  const round2 = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100;
  const interestRate = BANK_INTEREST.ABANK;

  const principal = Number(dto.totalAmount);
  const payments = dto.totalPayments;

  const baseMonthly = round2(principal / payments);
  const monthlyInterest = round2((principal * interestRate) / 100);

  const monthlyPayment = round2(baseMonthly + monthlyInterest);
  const totalInterest = round2(monthlyInterest * payments);
  const totalAmount = round2(principal + totalInterest);
  const start = parseISO(dto.startDate);
  if (isNaN(start.getTime())) {
    throw new BadRequestException(
      "Invalid startDate format. Expected ISO format: 2024-03-18T00:00:00.000Z",
    );
  }
  const end = addMonths(start, Number(dto.totalPayments));
  const startDateSQL = format(start, "yyyy-MM-dd");
  const endDateSQL = format(end, "yyyy-MM-dd");

  return {
    userId,
    startDate: startDateSQL,
    endDate: endDateSQL,
    totalAmount: totalAmount.toFixed(2),
    totalPayments: payments,
    monthlyPayment: monthlyPayment.toFixed(2),
    description: dto.description.trim(),
  };
};