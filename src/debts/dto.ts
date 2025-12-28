import { ApiProperty } from "@nestjs/swagger";
import {
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from "class-validator";

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
  interest: string;

  @ApiProperty({ example: "Monobank black credit limit", description: "Descriptions" })
  @IsString()
  @IsOptional()
  @Length(0, 200)
  description: string;
}
