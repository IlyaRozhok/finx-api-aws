import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserIntegrations } from "@/entities/user-integrations.entity";
import { Repository } from "typeorm";
import { UserIntegrationsProvider } from "@/shared/enums";
import {
  ClientInfoDto,
  IntegrationResDto,
  SyncMonobankResDto,
} from "@/modules/user-integration/dto";
import { MonobankService } from "@/modules/external/monobank/monobank.service";
import { plainToInstance } from "class-transformer";

@Injectable()
export class UserIntegrationService {
  constructor(
    @InjectRepository(UserIntegrations)
    private readonly UserIntegrationRepository: Repository<UserIntegrations>,
    private readonly monobankService: MonobankService,
  ) {}

  async findAll(userId: string): Promise<IntegrationResDto[]> {
    const integrations = await this.UserIntegrationRepository.find({
      where: { userId },
    });

    return integrations.map((integration) =>
      plainToInstance(IntegrationResDto, integration, {
        excludeExtraneousValues: true,
      }),
    );
  }

  async syncMonobank(
    dto: ClientInfoDto,
    userId: string,
  ): Promise<SyncMonobankResDto> {
    const { token } = dto;

    const accounts = await this.monobankService.getMonobankAccounts(
      dto
    );
    if (accounts) {
      const existingIntegration = await this.UserIntegrationRepository.findOne({
        where: {
          userId,
          provider: UserIntegrationsProvider.MONOBANK,
        },
      });

      let integration: UserIntegrations;

      if (existingIntegration) {
        existingIntegration.encryptedToken = token;
        existingIntegration.lastSyncedAt = new Date();
        integration =
          await this.UserIntegrationRepository.save(existingIntegration);
      } else {
        const monoIntegration = this.UserIntegrationRepository.create({
          userId,
          provider: UserIntegrationsProvider.MONOBANK,
          lastSyncedAt: new Date(),
          encryptedToken: token,
        });

        integration =
          await this.UserIntegrationRepository.save(monoIntegration);
      }


      return {
        accounts,
        integration: plainToInstance(IntegrationResDto, integration, {excludeExtraneousValues: true}),
      };
    }
  }

  async getClientInfo(userId: string) {
    const integration = await this.UserIntegrationRepository.findOne({
      where: {
        userId,
        provider: UserIntegrationsProvider.MONOBANK,
      },
    });

    if (!integration || !integration.encryptedToken) {
      throw new NotFoundException("Monobank integration not found");
    }

    const clientInfo = await this.monobankService.getClientInfo({
      token: integration.encryptedToken,
    });

    return clientInfo;
  }
}
