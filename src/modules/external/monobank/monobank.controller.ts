import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { MonobankService } from "./monobank.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "@/modules/auth/guards/jwt-auth.guard";
import { ENDPOINTS, ROUTE_SEGMENTS } from "@/shared/router";
import { Statement } from "@/modules/external/monobank/dto";

@UseGuards(JwtAuthGuard)
@ApiTags("Monobank")
@Controller(ROUTE_SEGMENTS.MONOBANK)
export class MonobankController {
  constructor(private readonly monobankService: MonobankService) {}

  @ApiResponse({
    status: 200,
    type: Statement,
    isArray: true,
    description: "Monobank statement fetched"
  })
  @ApiOperation({ summary: "Get transactions" })
  @Get(ENDPOINTS.INTEGRATIONS.MONOBANK.STATEMENT)
  getTransactions(
    @Query("from") from: string,
    @Query("to") to: string,
    @Query("accountId") accountId: string,
  ) {
    return this.monobankService.getStatement(from, to, accountId);
  }
}
