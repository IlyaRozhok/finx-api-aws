import { Controller, Get, Query, Req, UseGuards } from "@nestjs/common";
import { StatsService } from "./stats.service";
import { ENDPOINTS } from "@/shared/router";
import { ROUTE_SEGMENTS } from "@/shared/router";
import { JwtAuthGuard } from "@/modules/auth/guards/jwt-auth.guard";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@UseGuards(JwtAuthGuard)
@ApiTags("Statistics")
@Controller(ROUTE_SEGMENTS.STATS)
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @ApiOperation({ summary: "Get all incomes" })
  @Get(ENDPOINTS.STATS.INCOMES)
  async getAllIncomes(@Req() req) {
    const userId = req.user.sub;
    return await this.statsService.findAllIncomes(userId);
  }


  @ApiOperation({ summary: "Get all incomes" })
  @Get(ENDPOINTS.STATS.OVERVIEW)
  async getOverview(@Req() req, @Query("accountId") accountId: string) {
    const userId = req.user.sub;
    return await this.statsService.accountOverview(userId, accountId);
  }
}
