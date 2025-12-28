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
import { JwtAuthGuard } from "@/auth/guards/jwt-auth.guard";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";

import { plainToInstance } from "class-transformer";
import {
  CreateRegularIncomeDto,
  CreateRegularIncomeResDto,
  ResRegularIncomesDto,
  UpdateRegularIncomeDto,
} from "./dto";
import { RegularIncomesService } from "./regular-incomes.service";

@UseGuards(JwtAuthGuard)
@ApiTags("Regular Incomes")
@Controller(ROUTE_SEGMENTS.INCOMES)
export class RegularIncomesController {
  constructor(private readonly regularIncomesService: RegularIncomesService) {}

  @ApiResponse({
    status: 201,
    type: ResRegularIncomesDto,
    isArray: true,
    description: "Regular incomes fetched",
  })
  @ApiOperation({ summary: "Get regular incomes" })
  @Get(ENDPOINTS.REGULAR_INCOMES.GET)
  async getRegularIncomes(@Req() req) {
    const uid = req.user.sub;
    const incomes = await this.regularIncomesService.getAll(uid);
    return plainToInstance(ResRegularIncomesDto, incomes, {
      excludeExtraneousValues: true,
    });
  }

  @ApiResponse({
    status: 201,
    type: CreateRegularIncomeResDto,
    description: "Created regular income",
  })
  @ApiOperation({ summary: "Create regular income" })
  @Post(ENDPOINTS.REGULAR_INCOMES.CREATE)
  async createRegularIncomes(
    @Req() req,
    @Body() dto: CreateRegularIncomeDto
  ): Promise<CreateRegularIncomeResDto> {
    const userId = req.user.sub;

    const createdRegularIncomes = await this.regularIncomesService.create(
      userId,
      dto
    );

    return plainToInstance(CreateRegularIncomeResDto, createdRegularIncomes, {
      excludeExtraneousValues: true,
    });
  }

  @ApiResponse({
    status: 200,
    type: ResRegularIncomesDto,
    description: "Regular income fetched",
  })
  @ApiOperation({ summary: "Get regular income" })
  @Get(ENDPOINTS.REGULAR_INCOMES.BY_ID)
  async getRegularIncome(@Req() req, @Param("id") id: string) {
    const uid = req.user.sub;
    const income = await this.regularIncomesService.findOne(uid, id);
    return plainToInstance(ResRegularIncomesDto, income, {
      excludeExtraneousValues: true,
    });
  }

  @ApiResponse({
    status: 200,
    description: "Updated regular income",
  })
  @ApiOperation({ summary: "Update regular income" })
  @Put(ENDPOINTS.REGULAR_INCOMES.BY_ID)
  async updateRegularIncomes(
    @Req() req,
    @Param("id") id: string,
    @Body() dto: UpdateRegularIncomeDto
  ): Promise<UpdateRegularIncomeDto> {
    const userId = req.user.sub;

    const updatedRegularIncomes = await this.regularIncomesService.update(
      userId,
      id,
      dto
    );

    return plainToInstance(UpdateRegularIncomeDto, updatedRegularIncomes, {
      excludeExtraneousValues: true,
    });
  }

  @HttpCode(204)
  @ApiOperation({ summary: "Delete regular income" })
  @ApiParam({ name: "id", type: "string", description: "Income ID (uuid)" })
  @Delete(ENDPOINTS.REGULAR_INCOMES.BY_ID)
  async deleteRegularIncome(@Req() req, @Param("id") id: string) {
    const userId = req.user.sub;
    await this.regularIncomesService.delete(userId, id);
  }
}
