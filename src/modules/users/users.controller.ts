import { Controller, Get, Post, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { JwtAuthGuard } from "@/modules/auth/guards/jwt-auth.guard";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Req } from "@nestjs/common";
import { User } from "@/entities/user.entity";

@ApiTags("Users")
@UseGuards(JwtAuthGuard)
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: "Get user" })
  @ApiResponse({
    status: 200,
    type: User,
    description: "User fetched",
  })
  @Get()
  async getUser(@Req() req) {
    const userId = req.user.sub;
    return await this.usersService.findById(userId);
  }

  @ApiOperation({ summary: "Complete onboarding" })
  @ApiResponse({
    status: 200,
    type: User,
    description: "Onboarding completed",
  })
  @Post("complete-onboarding")
  async completeOnboarding(@Req() req) {
    const userId = req.user.sub;
    return await this.usersService.setOnboarded(userId);
  }
}
