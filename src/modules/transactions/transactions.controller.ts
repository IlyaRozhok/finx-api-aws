import {
  Body,
  Controller,
  Post,
  UseGuards,
  Req,
  Get,
  Delete,
  Param,
  Query,
} from "@nestjs/common";
import { JwtAuthGuard } from "@/modules/auth/guards/jwt-auth.guard";
import { TransactionsService } from "./transactions.service";
import { CreateTransactionDto, TransactionsResDto } from "@/modules/transactions/dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ENDPOINTS, ROUTE_SEGMENTS } from "@/shared/router";

@ApiTags("Transactions")
@Controller(ROUTE_SEGMENTS.TRANSACTIONS)
@UseGuards(JwtAuthGuard)
export class TransactionsController {
  constructor(private readonly transactionService: TransactionsService) {}

  @ApiOperation({ summary: "Create transaction" })
  @ApiResponse({
    status: 201,
    type: CreateTransactionDto,
    description: "Transaction created",
  })
  @Post()
  async create(@Req() req, @Body() dto: CreateTransactionDto) {
    const userId = req.user.sub;
    return await this.transactionService.create(dto, userId);
  }

  @ApiOperation({ summary: "Get transactions" })
  @ApiResponse({
    status: 200,
    type: TransactionsResDto,
    description: "Transaction fetched",
  })
  @Get()
  async getTransactions(@Req() req) {
    const userId = req.user.sub;
    return await this.transactionService.findAllTransactions(userId);
  }

  @ApiOperation({ summary: "Get this month expense transactions" })
  @ApiResponse({
    status: 200,
    type: TransactionsResDto,
    description: "this month expense fetched",
  })
  @Get(ENDPOINTS.TRANSACTIONS.MONTHLY_EXPENSES)
  async getThisMonthExpenseTransactionsByAccount(
    @Req() req,
    @Query("accountId") accountId: string,
  ) {
    const userId = req.user.sub;
    return await this.transactionService.findThisMonthExpensesByAccount(
      userId,
      accountId,
    );
  }

  @ApiOperation({ summary: "Get expense transactions" })
  @ApiResponse({
    status: 200,
    type: TransactionsResDto,
    description: "Transaction fetched",
  })
  @Get()
  async getExpenseTransactions(
    @Req() req,
    @Query("accountId") accountId: string,
  ) {
    const userId = req.user.sub;
    return await this.transactionService.findAllTransactions(userId);
  }

  @ApiOperation({ summary: "Get transactions" })
  @ApiResponse({
    status: 204,
    description: "Transaction deleted",
  })
  @Delete(":id")
  async deleteTransactions(@Param("id") id: string, @Req() req) {
    const userId = req.user.sub;
    return await this.transactionService.delete(userId, id);
  }
}
