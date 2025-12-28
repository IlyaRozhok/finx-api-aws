import { Module } from "@nestjs/common";
import { RegularIncomesController } from "./regular-incomes.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RegularIncomes } from "@/entities/incomes/income-regular.entity";
import { RegularIncomesService } from "./regular-incomes.service";

@Module({
  imports: [TypeOrmModule.forFeature([RegularIncomes])],
  controllers: [RegularIncomesController],
  providers: [RegularIncomesService],
  exports: [RegularIncomesService],
})
export class RegularIncomesModule {}
