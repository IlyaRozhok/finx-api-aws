import { IsUUID } from "class-validator";

export class ReqOverviewDto {
  @IsUUID()
  uid: string;
}
