import { Module } from "@nestjs/common";
import { RegularIncomesController } from "./regular-incomes.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RegularIncomes } from "@/entities/incomes/income-regular.entity";
import { RegularIncomesService } from "./regular-incomes.service";
import { EventIncomes } from "@/entities/incomes/income-event.entity";
import { EventIncomesService } from "@/modules/plan/incomes/event-incomes/event-incomes.service";
import { EventIncomesModule } from "@/modules/plan/incomes/event-incomes/event-incomes.module";

@Module({
  imports: [TypeOrmModule.forFeature([RegularIncomes]), EventIncomesModule],
  controllers: [RegularIncomesController],
  providers: [RegularIncomesService],
  exports: [RegularIncomesService],
})
export class RegularIncomesModule {}
