import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "@/modules/auth/guards/jwt-auth.guard";
import { DebtsService } from "./debt.service";
import { CreateDebtDto, UpdateDebtDto, DebtResDto } from "./dto";
import { ENDPOINTS, ROUTE_SEGMENTS } from "@/shared/router";

@ApiTags("Debts")
@UseGuards(JwtAuthGuard)
@Controller(ROUTE_SEGMENTS.DEBTS)
export class DebtsController {
  constructor(private readonly debtsService: DebtsService) {}

  @ApiOperation({ summary: "Get all debts" })
  @ApiResponse({
    status: 200,
    type: DebtResDto,
    isArray: true,
    description: "Debts fetched",
  })
  @Get()
  async findAll(@Req() req) {
    const userId = req.user.sub;
    return await this.debtsService.findAll(userId);
  }

  @ApiOperation({ summary: "Create debt" })
  @ApiBody({ type: CreateDebtDto })
  @ApiResponse({
    status: 201,
    type: DebtResDto,
    description: "Debt created",
  })
  @Post()
  async create(@Req() req, @Body() dto: CreateDebtDto) {
    const userId = req.user.sub;
    return await this.debtsService.create(userId, dto);
  }

  @ApiOperation({ summary: "Update debt" })
  @ApiBody({ type: UpdateDebtDto })
  @ApiResponse({
    status: 200,
    type: DebtResDto,
    description: "Debt updated",
  })
  @Put(":id")
  async update(
    @Req() req,
    @Param("id") id: string,
    @Body() dto: UpdateDebtDto
  ) {
    const userId = req.user.sub;
    return await this.debtsService.update(userId, id, dto);
  }

  @ApiOperation({ summary: "Delete debt" })
  @ApiResponse({
    status: 204,
    description: "Debt deleted",
  })
  @Delete(":id")
  async delete(@Req() req, @Param("id") id: string) {
    const userId = req.user.sub;
    return await this.debtsService.delete(userId, id);
  }
}
