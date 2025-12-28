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
import { InstallmentsService } from "./installments.service";
import {
  CreateInstallmentDto,
  UpdateInstallmentDto,
  InstallmentResponseDto,
} from "./dto";
import { ROUTE_SEGMENTS } from "@/shared/router";
import { JwtAuthGuard } from "@/auth/guards/jwt-auth.guard";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";

@UseGuards(JwtAuthGuard)
@ApiTags("Installments")
@Controller()
export class InstallmentsController {
  constructor(private readonly installmentsService: InstallmentsService) {}


  @ApiOperation({ summary: "Update installment" })
  @ApiResponse({
    status: 202,
    type: InstallmentResponseDto,
    description: "Installment updated",
  })
  @Put(`${ROUTE_SEGMENTS.INSTALLMENTS}/:id`)
  async updateInstallment(
    @Param("id") id: string,
    @Body() dto: UpdateInstallmentDto,
    @Req() req
  ) {
    const userId = req.user.sub;
    const installment = await this.installmentsService.update(dto, userId, id);
    return plainToInstance(InstallmentResponseDto, installment, {
      excludeExtraneousValues: true,
    });
  }
  @Get(ROUTE_SEGMENTS.INSTALLMENTS)
  async getInstallments(@Req() req) {
    const uid = req.user.sub;
    const installments = await this.installmentsService.findAll(uid);
    return installments;
  }

  @ApiBody({ type: CreateInstallmentDto })
  @ApiResponse({
    status: 201,
    type: CreateInstallmentDto,
    description: "Installment created",
  })
  @ApiOperation({ summary: "Create installment" })
  @Post(`${ROUTE_SEGMENTS.INSTALLMENTS}/create`)
  async createInstallment(@Body() dto: CreateInstallmentDto, @Req() req) {
    const userId = req.user.sub;
    const installment = await this.installmentsService.createInstallment(dto, userId);
    return plainToInstance(InstallmentResponseDto, installment, {
      excludeExtraneousValues: true,
    });
  }

  @ApiOperation({ summary: "Delete installment" })
  @ApiResponse({
    status: 204,
    description: "Installment deleted",
  })
  @Delete(`${ROUTE_SEGMENTS.INSTALLMENTS}/:id`)
  async deleteInstallment(@Param("id") id: string, @Req() req) {
    const userId = req.user.sub;
    await this.installmentsService.delete(id, userId);
  }
}
