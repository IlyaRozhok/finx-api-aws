import { TransactionDirection, TransactionType } from "@/transactions/types";
import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  MinLength,
} from "class-validator";
import { Expose, Transform } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class CreateTransactionDto {
  @ApiProperty({ enum: TransactionType, description: "Transaction type" })
  @IsEnum(TransactionType)
  type: TransactionType;

  @ApiProperty({
    enum: TransactionDirection,
    description: "Transaction direction",
  })
  @IsEnum(TransactionDirection)
  direction: TransactionDirection;

  @ApiProperty({
    description: "Category id",
    nullable: true,
  })
  @IsUUID()
  @IsOptional()
  categoryId?: string;

  @ApiProperty({
    description: "Installment id",
    nullable: true,
  })
  @IsUUID()
  @IsOptional()
  installmentId?: string;

  @ApiProperty({
    description: "Debt id",
    nullable: true,
  })
  @IsUUID()
  @IsOptional()
  debtId?: string;

  @ApiProperty({
    description: "Transaction amount",
    example: "1300",
  })
  @Transform(({ value }) => String(value).trim())
  @Matches(/^(?!0+(?:\.0{1,2})?$)\d+(\.\d{1,2})?$/)
  @IsString()
  amount: string;

  @ApiProperty({
    description: "Installment date. ISO format",
    example: "2025-07-01T19:08:37.000Z",
  })
  @IsDateString()
  occurredAt: string;

  @ApiProperty({
    description: "Transaction note",
  })
  @IsOptional()
  @IsString()
  @MinLength(1)
  note?: string;
}

export class TransactionsResDto {
  @Expose()
  @ApiProperty()
  type: TransactionType;

  @Expose()
  @ApiProperty()
  direction: TransactionDirection;

  @Expose()
  @ApiProperty()
  categoryId?: string;

  @Expose()
  @ApiProperty()
  installmentId?: string;

  @Expose()
  @ApiProperty()
  debtId?: string;

  @Expose()
  @ApiProperty()
  amount: string;

  @Expose()
  @ApiProperty()
  occurredAt: string;

  @Expose()
  @ApiProperty()
  note?: string;
}