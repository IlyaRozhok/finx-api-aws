import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { UserIntegrationService } from './user-integration.service';
import { ENDPOINTS, ROUTE_SEGMENTS } from "@/shared/router";
import { JwtAuthGuard } from "@/modules/auth/guards/jwt-auth.guard";
import {
  ClientInfoDto,
  IntegrationResDto,
  SyncMonobankResDto,
} from "@/modules/user-integration/dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

@UseGuards(JwtAuthGuard)
@Controller(ROUTE_SEGMENTS.INTEGRATION)
export class UserIntegrationController {
  constructor(
    private readonly userIntegrationService: UserIntegrationService,
  ) {}

  @ApiResponse({
    status: 200,
    type: SyncMonobankResDto,
    description: "Monobank synced",
  })
  @ApiOperation({ summary: "Sync monobank" })
  @Post(ENDPOINTS.INTEGRATIONS.MONOBANK.CONNECT)
  async monobankConnect(@Body() dto: ClientInfoDto, @Req() req) {
    const userId = req.user.sub;
    return await this.userIntegrationService.syncMonobank(dto, userId);
  }

  @ApiResponse({
    status: 200,
    type: IntegrationResDto,
    isArray: true,
    description: "Integrations fetched",
  })
  @Get(ENDPOINTS.INTEGRATIONS.FIND_ALL)
  async getIntegrations(@Req() req) {
    const userId = req.user.sub;
    return await this.userIntegrationService.findAll(userId);
  }

  @ApiOperation({ summary: "Get monobank client info" })
  @ApiResponse({
    status: 200,
    description: "Client info fetched",
  })
  @Get(ENDPOINTS.INTEGRATIONS.MONOBANK.CLIENT_INFO)
  async getClientInfo(@Req() req) {
    const userId = req.user.sub;
    return await this.userIntegrationService.getClientInfo(userId);
  }
}
