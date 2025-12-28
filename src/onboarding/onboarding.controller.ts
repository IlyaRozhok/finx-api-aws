import { Controller, Get, UseGuards, Query, Post, Body } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { ROUTE_SEGMENTS, ENDPOINTS } from "../shared/router";

import { UsersService } from "../users/users.service";
import { UpdateCurrencyDto, UpdateIncomesDto } from "./dto";
import { Category } from "../entities/onboarding.entity";
import { OnboardingService } from "./onboarding.service";
import { ApiTags } from "@nestjs/swagger";

@UseGuards(JwtAuthGuard)
@ApiTags("Onboarding")
@Controller(ROUTE_SEGMENTS.ONBOARDING)
export class OnboardingController {
  constructor(
    private readonly userService: UsersService,
    private readonly onboardingService: OnboardingService
  ) {}

  @Post(ENDPOINTS.ONBOARDING.CURRENCIES)
  async setOnboardingCurrencies(@Body() dto: UpdateCurrencyDto) {
    const updatedUser = await this.userService.updateCurrency(
      dto.uid,
      dto.currency
    );
    return updatedUser;
  }

  @Post(ENDPOINTS.ONBOARDING.INCOMES)
  async setOnboardingIncomes(@Body() dto: UpdateIncomesDto) {
    const updatedUser = await this.userService.updateIncomes(
      dto.uid,
      dto.incomes
    );
    return updatedUser;
  }

  @Post(ENDPOINTS.ONBOARDING.CATEGORIES)
  async setCategories(@Body() dto: Category[]) {
    const categories = await this.onboardingService.setCategories(dto);
    return categories;
  }

  @Get(ENDPOINTS.ONBOARDING.CATEGORIES)
  async getCategories() {
    const categories = await this.onboardingService.getCategories();
    return categories;
  }

  @Get(ENDPOINTS.ONBOARDING.SUMMARY)
  async getSummary(@Query("uid") uid: string) {
    const summary = await this.onboardingService.getSummary(uid);
    return summary;
  }
}
