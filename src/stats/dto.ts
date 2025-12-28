import { Debt } from "@/entities/debt.entity";
import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class ReqOverviewDto {
  @IsUUID()
  uid: string;
}

export class ResOverviewDto {
  @ApiProperty({ example: 130000, description: "Monthly incomes" })
  incomes: number;

  @ApiProperty({ type: [Debt] })
  debts: Debt[];
}
