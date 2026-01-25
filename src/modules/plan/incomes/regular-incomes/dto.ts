import { ApiProperty, PartialType } from "@nestjs/swagger";
import { Exclude, Expose, Type } from "class-transformer";
import { IsInt, IsString, MaxLength, Min } from "class-validator";

export class CreateRegularIncomeDto {
  @IsInt()
  @Type(() => Number)
  @Min(1, { message: "Quantity must be a positive integer." })
  @ApiProperty({ example: 100000 })
  amount: number;

  @IsString()
  @MaxLength(50)
  @ApiProperty({
    example: "Salary",
  })
  description: string;
}

@Exclude()
export class CreateRegularIncomeResDto {
  @Expose()
  @ApiProperty({ example: "id" })
  id: string;

  @Expose()
  @ApiProperty({ example: 130000 })
  amount: number;

  @Expose()
  @ApiProperty({
    example: "Salary",
  })
  description: string;
}
export class ResRegularIncomesDto {
  @Expose()
  @ApiProperty({ example: "id" })
  id: string;

  @Expose()
  @ApiProperty({ example: 130000, description: "Amount of income" })
  amount: number;

  @Expose()
  @ApiProperty({
    example: "Salary from IN1",
    description: "Description of income",
  })
  description: string;
}

export class UpdateRegularIncomeDto extends PartialType(
  CreateRegularIncomeDto
) {}
