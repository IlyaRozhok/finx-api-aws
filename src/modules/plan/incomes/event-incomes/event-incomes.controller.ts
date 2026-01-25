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
import { EventIncomeDto, EventIncomeResDto } from "./dto";
import { JwtAuthGuard } from "@/modules/auth/guards/jwt-auth.guard";

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
    return await this.eventIncomesService.create(
      userId,
      dto
    );

  }
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    type: EventIncomeResDto
  })
  @ApiOperation({ summary: "Get all event incomes" })
  @Get(ENDPOINTS.EVENT_INCOMES.GET)
  async getAllEventIncomes(@Req() req): Promise<EventIncomeResDto[]> {
    const userId = req.user.sub;
    return await this.eventIncomesService.getAll(userId);
  }

  @ApiOperation({ summary: "Get event income by id" })
  @ApiParam({ name: "id", description: "Event income id" })
  @ApiResponse({
    status: 200,
    type: EventIncomeResDto,
    description: "Event income fetched",
  })
  @Get(ENDPOINTS.EVENT_INCOMES.BY_ID)
  async getEventIncome(@Req() req, @Param("id") id: string): Promise<EventIncomeResDto> {
    const userId = req.user.sub;
    return await this.eventIncomesService.findOne(userId, id);
  }

  @ApiOperation({ summary: "Update event income" })
  @ApiParam({ name: "id", description: "Event income id" })
  @ApiResponse({
    status: 200,
    type: EventIncomeResDto,
    description: "Event income updated",
  })
  @Put(ENDPOINTS.EVENT_INCOMES.BY_ID)
  async updateEventIncome(
    @Req() req,
    @Param("id") id: string,
    @Body() dto: EventIncomeDto
  ): Promise<EventIncomeResDto> {
    const userId = req.user.sub;
    return await this.eventIncomesService.update(userId, id, dto);
  }

  @ApiOperation({ summary: "Delete event income" })
  @ApiParam({ name: "id", description: "Event income id" })
  @ApiResponse({
    status: 204,
    description: "Event income deleted",
  })
  @Delete(ENDPOINTS.EVENT_INCOMES.BY_ID)
  @HttpCode(204)
  async deleteEventIncome(@Req() req, @Param("id") id: string) {
    const userId = req.user.sub;
    await this.eventIncomesService.delete(userId, id);
  }
}
