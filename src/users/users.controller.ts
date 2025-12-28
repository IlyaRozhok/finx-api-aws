import {
  Controller,
  Get,
  Param,
  NotFoundException,
  Post,
  UseGuards,
  Req,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { User } from "../entities/user.entity";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(":id")
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  @ApiOperation({ summary: "Get user by ID" })
  @ApiResponse({ status: 200, description: "User found" })
  @ApiResponse({ status: 404, description: "User not found" })
  async findById(@Param("id") id: string): Promise<User> {
    const user = await this.usersService.findById(id);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }

  @Post("complete-onboarding")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Complete user onboarding" })
  @ApiResponse({
    status: 200,
    description: "Onboarding completed successfully",
  })
  async completeOnboarding(@Req() req) {
    const uid = req.user.sub;
    const user = await this.usersService.completeOnboarding(uid);
    return user;
  }
}
