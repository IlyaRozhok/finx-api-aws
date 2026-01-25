import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Debt } from "@/entities/debt.entity";
import { DebtsController } from "./debt.controller";
import { DebtsService } from "./debt.service";

@Module({
  imports: [TypeOrmModule.forFeature([Debt])],
  controllers: [DebtsController],
  providers: [DebtsService],
  exports: [TypeOrmModule, DebtsService],
})
export class DebtsModule {}
