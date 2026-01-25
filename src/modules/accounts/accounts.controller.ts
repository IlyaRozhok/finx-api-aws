import { Body, Controller, Get, Post, Query, Req, UseGuards } from "@nestjs/common";
import { AccountsService } from "./accounts.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ENDPOINTS, ROUTE_SEGMENTS } from "@/shared/router";
import {
  AccountBalanceDto,
  AccountsResDto,
  CreateAccountDto, SyncMonobankAccountDto,
} from "@/modules/accounts/dto";
import { JwtAuthGuard } from "@/modules/auth/guards/jwt-auth.guard";

@ApiTags("Accounts")
@UseGuards(JwtAuthGuard)
@Controller(ROUTE_SEGMENTS.ACCOUNTS)
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @ApiOperation({ summary: "Get account by id" })
  @ApiResponse({
    status: 200,
    type: AccountsResDto,
    description: "Accounts fetched",
  })
  @Post(ENDPOINTS.ACCOUNTS.FIND_INE)
  async findOneAccount(@Req() req, @Query("id") id: string) {
    return await this.accountsService.findById(id);
  }

  @ApiOperation({ summary: "Create account" })
  @ApiResponse({
    status: 201,
    type: CreateAccountDto,
    description: "Account created",
  })
  @Post(ENDPOINTS.ACCOUNTS.CREATE)
  async createAccount(@Req() req, @Body() dto: CreateAccountDto) {
    const userId = req.user.sub;
    return await this.accountsService.create(dto, userId);
  }

  @ApiOperation({ summary: "Fetch all accounts" })
  @ApiResponse({
    status: 200,
    type: AccountsResDto,
    description: "Accounts fetched",
  })
  @Get()
  async fetchAccounts(@Req() req) {
    const userId = req.user.sub;
    return await this.accountsService.findAll(userId);
  }

  @ApiOperation({ summary: "Sync monobank transactions" })
  @Post("/monobank/sync")
  async syncMonobankAccount(@Body() dto: SyncMonobankAccountDto, @Req() req) {
    const userId = req.user.sub;
    await this.accountsService.syncMonoStatement(dto, userId);
  }
}
