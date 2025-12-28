import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Matches,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateRecurringExpenseDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsUUID() userId: string;

  @IsUUID()
  categoryId: string;

  @IsNumberString()
  amount: string;

  @IsString()
  @IsOptional()
  @Length(0, 200)
  description?: string;
}

export class CreateExpenseDto {
  @ApiProperty({
    description: "Category id",
    example: "114f1dc0-86a8-4828-9130-7fe357c9ac6e",
  })
  @IsUUID()
  categoryId: string;

  @ApiProperty({
    description: "Description",
    example: "Utilities",
  })
  @IsString()
  @IsOptional()
  @Length(0, 150)
  description?: string;

  @ApiProperty({
    description: "Amount",
    example: "2000.75",
  })
  @IsNotEmpty()
  @IsNumberString()
  amount: string;
}

export class UpdateExpenseDto {
  @ApiProperty({
    description: "Category id",
    example: "114f1dc0-86a8-4828-9130-7fe357c9ac6e",
  })
  @IsUUID()
  categoryId: string;

  @ApiProperty({
    description: "Description",
    example: "Utilities",
  })
  @IsString()
  @Length(0, 150)
  description: string;

  @ApiProperty({
    description: "Amount",
    example: "2000.75",
  })
  @IsNotEmpty()
  @IsNumberString()
  amount: string;
}