import { Module } from "@nestjs/common";
import { EventIncomesService } from "./event-incomes.service";
import { EventIncomesController } from "./event-incomes.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EventIncomes } from "@/entities/incomes/income-event.entity";

@Module({
  imports: [TypeOrmModule.forFeature([EventIncomes])],
  controllers: [EventIncomesController],
  providers: [EventIncomesService],
  exports: [EventIncomesService],
})
export class EventIncomesModule {}
