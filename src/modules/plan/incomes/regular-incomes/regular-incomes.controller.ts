import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from "@nestjs/common";

import { ENDPOINTS, ROUTE_SEGMENTS } from "@/shared/router";
import { JwtAuthGuard } from "@/modules/auth/guards/jwt-auth.guard";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";

import {
  CreateRegularIncomeDto,
  CreateRegularIncomeResDto,
  ResRegularIncomesDto,
  UpdateRegularIncomeDto,
} from "./dto";
import { RegularIncomesService } from "./regular-incomes.service";

@ApiTags("Regular Incomes")
@UseGuards(JwtAuthGuard)
@Controller(ROUTE_SEGMENTS.INCOMES)
export class RegularIncomesController {
  constructor(
    private readonly regularIncomesService: RegularIncomesService
  ) {}

  @ApiOperation({ summary: "Get all regular incomes" })
  @ApiResponse({
    status: 200,
    type: ResRegularIncomesDto,
    description: "Regular incomes fetched",
  })
  @Get(ENDPOINTS.REGULAR_INCOMES.GET)
  async getRegularIncomes(@Req() req) {
    const userId = req.user.sub;
    return await this.regularIncomesService.getAll(userId);
  }

  @ApiOperation({ summary: "Create regular income" })
  @ApiResponse({
    status: 201,
    type: CreateRegularIncomeResDto,
    description: "Regular income created",
  })
  @Post(ENDPOINTS.REGULAR_INCOMES.CREATE)
  @HttpCode(201)
  async createRegularIncomes(@Req() req, @Body() dto: CreateRegularIncomeDto) {
    const userId = req.user.sub;
    return await this.regularIncomesService.create(userId, dto);
  }

  @ApiOperation({ summary: "Get regular income by id" })
  @ApiParam({ name: "id", description: "Regular income id" })
  @ApiResponse({
    status: 200,
    type: ResRegularIncomesDto,
    description: "Regular income fetched",
  })
  @Get(ENDPOINTS.REGULAR_INCOMES.BY_ID)
  async getRegularIncome(@Req() req, @Param("id") id: string) {
    const userId = req.user.sub;
    return await this.regularIncomesService.findOne(userId, id);
  }

  @ApiOperation({ summary: "Update regular income" })
  @ApiParam({ name: "id", description: "Regular income id" })
  @ApiResponse({
    status: 200,
    type: UpdateRegularIncomeDto,
    description: "Regular income updated",
  })
  @Put(ENDPOINTS.REGULAR_INCOMES.BY_ID)
  async updateRegularIncomes(
    @Req() req,
    @Param("id") id: string,
    @Body() dto: UpdateRegularIncomeDto
  ) {
    const userId = req.user.sub;
    return await this.regularIncomesService.update(userId, id, dto);
  }

  @ApiOperation({ summary: "Delete regular income" })
  @ApiParam({ name: "id", description: "Regular income id" })
  @ApiResponse({
    status: 204,
    description: "Regular income deleted",
  })
  @Delete(ENDPOINTS.REGULAR_INCOMES.BY_ID)
  @HttpCode(204)
  async deleteRegularIncomes(@Req() req, @Param("id") id: string) {
    const userId = req.user.sub;
    return await this.regularIncomesService.delete(userId, id);
  }
}
