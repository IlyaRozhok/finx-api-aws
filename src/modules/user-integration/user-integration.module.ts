import { Module } from '@nestjs/common';
import { UserIntegrationService } from './user-integration.service';
import { UserIntegrationController } from './user-integration.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserIntegrations } from "@/entities/user-integrations.entity";
import { MonobankModule } from "@/modules/external/monobank/monobank.module";
import { AccountsModule } from "@/modules/accounts/accounts.module";

@Module({
  imports: [TypeOrmModule.forFeature([UserIntegrations]), MonobankModule, AccountsModule],
  controllers: [UserIntegrationController],
  providers: [UserIntegrationService],
})
export class UserIntegrationModule {}
