import {
  IsUUID,
  IsDateString,
  IsInt,
  IsBoolean,
  IsNotEmpty,
  IsString,
  Min,
  IsOptional,
  Matches,
} from "class-validator";
import { Expose, Transform, Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class CreateInstallmentDto {
  @IsOptional()
  @IsUUID()
  @IsOptional()
  id?: string;

  @ApiProperty({
    description: "Date of start an installment",
    example: "2025-07-01T19:08:37.000Z",
  })
  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @ApiProperty({ description: "Total amount of installment", example: 20000 })
  @Matches(/^(?!0+(?:\.0{1,2})?$)\d+(\.\d{1,2})?$/)
  @IsString()
  totalAmount: string;

  @ApiProperty({ description: "Total number of payments", example: 6 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  totalPayments: number;

  @ApiProperty({ example: "iPhone 17 Pro", description: "Description" })
  @IsString()
  @IsNotEmpty()
  description: string;
}

export class UpdateInstallmentDto {
  @ApiProperty({
    description: "Date of start an installment",
    example: "2025-07-01T19:08:37.000Z",
  })
  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @ApiProperty({ description: "Total amount of installment", example: 20000 })
  @Matches(/^(?!0+(?:\.0{1,2})?$)\d+(\.\d{1,2})?$/)
  @IsString()
  totalAmount: string;

  @ApiProperty({ description: "Total number of payments", example: 6 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  totalPayments: number;

  @ApiProperty({ example: "iPhone 17 Pro", description: "Description" })
  @IsString()
  @IsNotEmpty()
  description: string;
}

export class InstallmentResponseDto {
  @Expose()
  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

  @Expose()
  @ApiProperty()
  description: string;

  @Expose()
  @ApiProperty()
  startDate: string;

  @Expose()
  @ApiProperty()
  endDate: string;

  @Expose()
  @ApiProperty()
  totalAmount: string;

  @Expose()
  @ApiProperty()
  monthlyPayment: string;

  @Expose()
  @ApiProperty()
  totalPayments: number;

  @Expose()
  @ApiProperty()
  status: string;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;
}
