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
import { EventIncomesService } from "./event-incomes.service";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ENDPOINTS, ROUTE_SEGMENTS } from "@/shared/router";
import { plainToInstance } from "class-transformer";
import { EventIncomeDto, EventIncomeResDto } from "./dto";
import { JwtAuthGuard } from "@/auth/guards/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@ApiTags("Event Incomes")
@Controller(ROUTE_SEGMENTS.INCOMES)
export class EventIncomesController {
  constructor(private readonly eventIncomesService: EventIncomesService) {}

  @ApiOperation({ summary: "Create event income" })
  @Post(ENDPOINTS.EVENT_INCOMES.CREATE)
  async createEventIncome(
    @Req() req,
    @Body() dto: EventIncomeDto
  ): Promise<EventIncomeResDto> {
    const userId = req.user.sub;

    const createdEventIncome = await this.eventIncomesService.create(
      userId,
      dto
    );

    return plainToInstance(EventIncomeResDto, createdEventIncome, {
      excludeExtraneousValues: true,
    });
  }
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    type: EventIncomeResDto,
    description: "Created evennt income",
  })
  @ApiOperation({ summary: "Get event incomes" })
  @Get(ENDPOINTS.EVENT_INCOMES.GET)
  async getEventIncomes(@Req() req) {
    const userId = req.user.sub;
    const eventIncomes = await this.eventIncomesService.getAll(userId);
    return plainToInstance(EventIncomeResDto, eventIncomes, {
      excludeExtraneousValues: true,
    });
  }

  @ApiResponse({
    status: 201,
    type: EventIncomeResDto,
    description: "One event income fetched",
  })
  @HttpCode(201)
  @ApiOperation({ summary: "Get one event income" })
  @Get(ENDPOINTS.EVENT_INCOMES.BY_ID)
  async getOneEventIncome(@Req() req, @Param("id") id: string) {
    const userId = req.user.sub;
    const income = await this.eventIncomesService.findOne(userId, id);
    return plainToInstance(EventIncomeResDto, income, {
      excludeExtraneousValues: true,
    });
  }

  @ApiResponse({
    status: 204,
    type: EventIncomeResDto,
    description: "Event income updated",
  })
  @ApiOperation({ summary: "Update event income" })
  @Put(ENDPOINTS.EVENT_INCOMES.BY_ID)
  async updateEventIncome(
    @Req() req,
    @Body() dto: EventIncomeDto,
    @Param("id") id: string
  ): Promise<EventIncomeDto> {
    const userId = req.user.sub;
    const income = await this.eventIncomesService.update(userId, id, dto);

    return plainToInstance(EventIncomeResDto, income, {
      excludeExtraneousValues: true,
    });
  }

  @ApiOperation({ summary: "Delete event income" })
  @ApiResponse({
    status: 204,
    type: EventIncomeDto,
    description: "One event income fetched",
  })
  @HttpCode(204)
  @ApiOperation({ summary: "Delete event income" })
  @ApiParam({ name: "id", type: "string", description: "Income ID (uuid)" })
  @Delete(ENDPOINTS.EVENT_INCOMES.BY_ID)
  async deleteEventIncome(@Req() req, @Param("id") id: string) {
    const userId = req.user.sub;
    await this.eventIncomesService.delete(userId, id);
  }
}
