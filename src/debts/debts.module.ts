import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Debt } from "../entities/debt.entity";
import { DebtsController } from "./debt.controller";
import { DebtsService } from "./debt.service";

@Module({
  imports: [TypeOrmModule.forFeature([Debt])],
  exports: [TypeOrmModule, DebtsService],
  controllers: [DebtsController],
  providers: [DebtsService],
})
export class DebtsModule {}
