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
import { RecurringExpensesService } from "./recurring-expenses.service";
import { RecurringExpense } from "../entities/recurring-expense.entity";
import { ROUTE_SEGMENTS } from "@/shared/router";
import { JwtAuthGuard } from "@/auth/guards/jwt-auth.guard";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateExpenseDto, UpdateExpenseDto } from "@/expenses/dto";

@UseGuards(JwtAuthGuard)
@ApiTags("Expenses")
@Controller(ROUTE_SEGMENTS.EXPENSES)
export class RecurringExpensesController {
  constructor(
    private readonly recurringExpensesService: RecurringExpensesService,
  ) {}

  @ApiOperation({ summary: "Create expenses" })
  @Post("create-expenses")
  async createExpenses(@Body() dto: RecurringExpense[]) {
    return await this.recurringExpensesService.updateExpenses(dto);
  }

  @ApiOperation({ summary: "Get expense" })
  @Get()
  async getOnboardingExpenses(@Req() req) {
    const uid = req.user.sub;
    return await this.recurringExpensesService.getExpenses(uid);
  }

  @ApiOperation({ summary: "Delete expense" })
  @Delete("/:id")
  async deleteExpense(@Param("id") id: string) {
    await this.recurringExpensesService.deleteExpense(id);
    return true
  }

  @ApiOperation({ summary: "Create expense" })
  @Post()
  async createExpense(@Body() dto: CreateExpenseDto, @Req() req) {
    const userId = req.user.sub;
    return await this.recurringExpensesService.createExpense(dto, userId);
  }

  @ApiOperation({summary: "Update expense"})
  @Put("/:id")
  async updateExpense(@Body() dto: UpdateExpenseDto, @Req() req, @Param("id") id: string) {
    const userId = req.user.sub;
    return await this.recurringExpensesService.updateExpense(dto, userId, id)
  }
}
