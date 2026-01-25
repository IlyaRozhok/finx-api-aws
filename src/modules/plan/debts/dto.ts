import { ApiProperty } from "@nestjs/swagger";
import {
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from "class-validator";
import { Expose } from "class-transformer";
import { DebtType } from "@/entities/debt.entity";

export class CreateDebtsDto {
  @IsUUID()
  @ApiProperty({ example: "4b1c9f5e-..." })
  userId: string;

  @ApiProperty({ example: "147897.09" })
  @IsString()
  totalDebt: string;

  @ApiProperty({
    example: "3.4",
    nullable: true,
    description: "3.4% / month",
  })
  @IsNumberString()
  interest: string;

  @ApiProperty({ example: "Monobank black credit limit" })
  @IsString()
  @IsOptional()
  @Length(0, 200)
  description: string;
}

export class CreateDebtDto {
  @ApiProperty({ example: "147897.09", description: "Total debt amount" })
  @IsString()
  totalDebt: string;

  @ApiProperty({
    example: "3.4",
    nullable: true,
    description: "Bank interest per month ",
  })
  @IsNumberString()
  @IsOptional()
  interest: string;

  @ApiProperty({ example: "Monobank black credit limit", description: "Descriptions" })
  @IsString()
  @IsOptional()
  @Length(0, 200)
  description: string;
}

export class UpdateDebtDto {
  @ApiProperty({ example: "147897.09", description: "Total debt amount" })
  @IsString()
  @IsOptional()
  totalDebt: string;

  @ApiProperty({
    example: "3.4",
    nullable: true,
    description: "Bank interest per month ",
  })
  @IsNumberString()
  @IsOptional()
  interest: string;

  @ApiProperty({ example: "Monobank black credit limit", description: "Descriptions" })
  @IsString()
  @IsOptional()
  @Length(0, 200)
  description: string;
}

export class DebtResDto {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  description: string;

  @Expose()
  @ApiProperty({ enum: DebtType })
  debtType: DebtType;

  @Expose()
  @ApiProperty()
  totalDebt: string;

  @Expose()
  @ApiProperty({ nullable: true })
  monthlyPayment?: string | null;

  @Expose()
  @ApiProperty({ nullable: true })
  interest?: string | null;

  @Expose()
  @ApiProperty({ nullable: true })
  gracePeriodDays?: number | null;

  @Expose()
  @ApiProperty()
  startDate: string;

  @Expose()
  @ApiProperty({ nullable: true })
  statementDay?: number | null;

  @Expose()
  @ApiProperty({ nullable: true })
  dueDay?: number | null;

  @Expose()
  @ApiProperty()
  isClosed: boolean;

  @Expose()
  @ApiProperty()
  createdAt: Date;

  @Expose()
  @ApiProperty()
  updatedAt: Date;
}
