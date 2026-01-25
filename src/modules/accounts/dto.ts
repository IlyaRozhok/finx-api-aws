import {
  IsString,
  IsEnum,
  MinLength,
  MaxLength,
  IsOptional,
  IsIn,
  IsNotEmpty,
  ValidateIf,
  IsUUID,
} from "class-validator";
import { AccountAssetType, AccountProvider, AccountType } from "@/shared/enums";
import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

const ALLOWED_CURRENCIES = ["UAH", "USD", "EUR", "GBP"] as const;
const ALLOWED_CRYPTO_COINS = [
  "USDT",
  "USDC",
  "BTC",
  "ETH",
  "SOL",
  "BNB",
  "XRP",
] as const;

export class CreateAccountDto {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @ApiProperty({ description: "Account name", example: "Cash" })
  name: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  @ApiProperty({ example: "Main cash savings" })
  description?: string;

  @ApiProperty({
    description: "Account type",
    example: "card",
    enum: AccountType,
  })
  @IsEnum(AccountType)
  type: AccountType;

  @ApiProperty({
    description: "Account asset type",
    enum: AccountAssetType,
    example: "fiat",
  })
  @IsEnum(AccountAssetType)
  assetType: AccountAssetType;

  @ApiProperty({
    description: "Asset code",
    example: "usd",
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(16)
  @ValidateIf((o: CreateAccountDto) => o.assetType === AccountAssetType.FIAT)
  @IsIn(ALLOWED_CURRENCIES)
  @ValidateIf((o: CreateAccountDto) => o.assetType === AccountAssetType.CRYPTO)
  @IsIn(ALLOWED_CRYPTO_COINS)
  assetCode: string;

  @ApiProperty({
    description: "Provider",
    enum: AccountProvider,
    example: "manual",
  })
  @IsEnum(AccountProvider)
  provider: AccountProvider;

  @ApiProperty({
    description: "External id",
    example: "12433",
  })
  @ValidateIf((o) => o.provider !== AccountProvider.MANUAL)
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  externalId?: string;
}

export class AccountsResDto {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty()
  description: string;

  @Expose()
  @ApiProperty({ enum: AccountType })
  type: AccountType;

  @Expose()
  @ApiProperty()
  assetType: string;

  @Expose()
  @ApiProperty()
  assetCode: string;

  @Expose()
  @ApiProperty({ enum: AccountProvider })
  provider: AccountProvider;

  @Expose()
  @ApiProperty({ enum: AccountProvider })
  externalId?: string;
}

export class AccountBalanceDto {
  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty({ enum: AccountProvider })
  provider: AccountProvider;

  @Expose()
  @ApiProperty()
  balance: string;
}

export class SyncMonobankAccountDto {
  @IsString()
  from: string;

  @IsString()
  to: string;

  @IsUUID()
  accountId: string;
}