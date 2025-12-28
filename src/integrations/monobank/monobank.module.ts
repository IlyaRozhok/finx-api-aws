import { Module } from '@nestjs/common';
import { MonobankService } from './monobank.service';
import { MonobankController } from "./monobank.controller";
import { HttpModule } from "@nestjs/axios";

@Module({
  controllers: [MonobankController],
  providers: [MonobankService],
  imports: [HttpModule]

})
export class MonobankModule {}
