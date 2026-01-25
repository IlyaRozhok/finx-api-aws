import { Module } from '@nestjs/common';
import { MonobankService } from './monobank.service';
import { MonobankController } from "./monobank.controller";
import { HttpModule } from "@nestjs/axios";
import { UserIntegrationModule } from "@/modules/user-integration/user-integration.module";

@Module({
  controllers: [MonobankController],
  providers: [MonobankService],
  imports: [HttpModule],
  exports: [MonobankService],
})
export class MonobankModule {}
