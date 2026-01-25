import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";
import { firstValueFrom } from "rxjs";
import {
  ClientInfoRespDto,
  MonobankAccountResDto, Statement,
} from "@/modules/external/monobank/dto";
import { plainToInstance } from "class-transformer";
import { ClientInfoDto } from "@/modules/user-integration/dto";
import { ENDPOINTS } from "@/shared/router";

@Injectable()
export class MonobankService {
  private readonly token: string;
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.token = this.configService.getOrThrow("MONOBANK_TOKEN");
  }

  async getMonobankAccounts(dto: ClientInfoDto) {
    const { token } = dto;

    try {
      const res = await firstValueFrom(
        this.httpService.get(ENDPOINTS.EXTERNAL.MONOBANK.CLIENT_INFO, {
          headers: {
            "X-Token": token,
          },
        }),
      );

      const clientInfo: ClientInfoRespDto = res.data;

      const accounts = (clientInfo.accounts = clientInfo.accounts.filter(
        (acc) => acc.type === "black" || acc.type === "fop",
      ));

      return plainToInstance(MonobankAccountResDto, accounts, {
        excludeExtraneousValues: true,
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  async getClientInfo(dto: ClientInfoDto): Promise<ClientInfoRespDto> {
    const { token } = dto;

    try {
      const res = await firstValueFrom(
        this.httpService.get(ENDPOINTS.EXTERNAL.MONOBANK.CLIENT_INFO, {
          headers: {
            "X-Token": token,
          },
        }),
      );

      const clientInfo: ClientInfoRespDto = res.data;

      // Фильтруем только black и fop счета
      clientInfo.accounts = clientInfo.accounts.filter(
        (acc) => acc.type === "black",
      );

      return clientInfo;
    } catch (e) {
      throw new Error(e);
    }
  }

  async getStatement(
    from: string,
    to: string,
    accountId: string,
  ): Promise<Statement[]> {
    try {
      const res = await firstValueFrom(
        this.httpService.get(
          `${ENDPOINTS.EXTERNAL.MONOBANK.STATEMENT}${accountId}/${from}/${to}`,
          {
            headers: {
              "X-Token": this.token,
            },
          },
        ),
      );
      return res.data;
    } catch (e) {
      return e;
    }
  }
}
