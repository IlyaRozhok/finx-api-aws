import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { Status, UserIntegrationsProvider } from "@/shared/enums";
import { IsString, MinLength } from "class-validator";
import { MonobankAccountResDto } from "@/modules/external/monobank/dto";

export class IntegrationResDto {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  lastSyncedAt: string;

  @Expose()
  @ApiProperty()
  status: Status;

  @Expose()
  @ApiProperty()
  provider: UserIntegrationsProvider;
}

export class ClientInfoDto {
  @MinLength(40)
  @IsString()
  token: string;
}


export class SyncMonobankResDto {
  @ApiProperty()
  accounts: MonobankAccountResDto[];

  @ApiProperty()
  integration: IntegrationResDto;
}