import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";

import { ROUTE_SEGMENTS } from "@/shared/router";
import { DebtsService } from "./debt.service";
import { CreateDebtDto, CreateDebtsDto } from "./dto";
import { JwtAuthGuard } from "@/auth/guards/jwt-auth.guard";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@UseGuards(JwtAuthGuard)
@ApiTags("Debts")
@Controller()
export class DebtsController {
  constructor(private readonly DebtsService: DebtsService) {}

  @ApiOperation({ summary: "Get debts" })
  @Get(ROUTE_SEGMENTS.DEBTS)
  async getOnboardingDebts(@Req() req) {
    const uid = req.user.sub;
    return await this.DebtsService.findAll(uid);
  }

  @ApiOperation({ summary: "Create debts" })
  @ApiBody({ type: [CreateDebtsDto] })
  @Post(ROUTE_SEGMENTS.DEBTS + "/create")
  async createDebts(@Body() dto: CreateDebtsDto[]) {
    return await this.DebtsService.createMany(dto);
  }

  @ApiResponse({
    type: CreateDebtDto,
    description: "Debt created",
    status: 201,
  })
  @ApiOperation({ summary: "Create debt" })
  @Post(ROUTE_SEGMENTS.DEBTS)
  async createDebt(@Body() dto: CreateDebtDto, @Req() req) {
    const userId = req.user.sub;
    return await this.DebtsService.create(dto, userId)
  }

  @ApiOperation({ summary: "Update debts" })
  @Put(`${ROUTE_SEGMENTS.DEBTS}/:id`)
  async updateDebt(@Param("id") id: string, @Body() dto: CreateDebtsDto) {
    return await this.DebtsService.update(id, dto);
  }

  @ApiOperation({ summary: "Delete debts" })
  @Delete(`${ROUTE_SEGMENTS.DEBTS}/:id`)
  async deleteDebt(@Param("id") id: string) {
    return await this.DebtsService.delete(id);
  }
}
