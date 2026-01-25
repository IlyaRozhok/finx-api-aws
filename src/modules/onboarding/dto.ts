import { IsUUID, IsIn, IsNotEmpty } from "class-validator";

const ALLOWED_CURRENCIES = ["UAH", "USD", "EUR"] as const;

export class UpdateCurrencyDto {
  @IsUUID(4, { message: "Invalid user ID format" })
  @IsNotEmpty({ message: "User ID is required" })
  uid: string;

  @IsIn(ALLOWED_CURRENCIES, {
    message: "Currency must be one of: UAH, USD, EUR",
  })
  @IsNotEmpty({ message: "Currency is required" })
  currency: string;
}

export class UpdateIncomesDto {
  @IsUUID(4, { message: "Invalid user ID format" })
  @IsNotEmpty({ message: "User ID is required" })
  uid: string;

  @IsNotEmpty({ message: "Currency is required" })
  incomes: number;
}
