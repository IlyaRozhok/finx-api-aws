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
  sendId: string;

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

export class MonobankAccountResDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  sendId: string;

  @ApiProperty()
  @Expose()
  currencyCode: number;

  @ApiProperty()
  @Expose()
  balance: number;

  @ApiProperty()
  @Expose()
  creditLimit: number;

  @ApiProperty()
  @Expose()
  iban: string;

  @ApiProperty({isArray: true})
  maskedPan: string[]

  type: string;
}


export class Statement {
  @ApiProperty()
  id: string;

  @ApiProperty()
  time: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  mcc: number;

  @ApiProperty()
  originalMcc: number;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  operationAmount: number;

  @ApiProperty()
  currencyCode: number;

  @ApiProperty()
  commissionRate: number;

  @ApiProperty()
  cashbackAmount: number;

  @ApiProperty()
  balance: number;

  @ApiProperty()
  hold: boolean;

  @ApiProperty()
  receiptId?: string;
}
