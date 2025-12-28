import { Expose } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class MonoJar {
  @ApiProperty()
  id: string;

  @ApiProperty()
  sendId: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  currencyCode: number;

  @ApiProperty()
  balance: number;

  @ApiProperty()
  goal: number;
}

export class MonoAccount {
  @ApiProperty()
  id: string;

  @ApiProperty()
  currencyCode: number;

  @ApiProperty()
  balance: number;

  @ApiProperty()
  creditLimit: number;

  @ApiProperty()
  maskedPan: [];

  @ApiProperty()
  type: string;

  @ApiProperty()
  iban: string;
}

export class ClientInfoRespDto {
  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty({ type: [MonoAccount] })
  accounts: MonoAccount[];

  @Expose()
  @ApiProperty({ type: [MonoJar] })
  jars: MonoJar[];
}


