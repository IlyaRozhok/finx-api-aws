import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "@/entities/user.entity";
import { GooglePayload } from "@/modules/auth/strategies/types";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async findById(id: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }

  async upsertFromGoogle(profile: GooglePayload): Promise<User> {
    let user = await this.userRepository.findOne({
      where: { googleSub: profile.googleSub },
    });
    if (!user && profile.email) {
      user = await this.userRepository.findOne({
        where: { email: profile.email },
      });
    }
    if (!user) {
      user = this.userRepository.create({
        email: profile.email,
        userName: profile.userName,
        googleSub: profile.googleSub,
        avatarUrl: profile.avatarUrl,
      });
    } else {
      user.googleSub = profile.googleSub;
      user.userName = profile.userName ?? user.userName;
      user.avatarUrl = profile.avatarUrl ?? user.avatarUrl;
      if (profile.email) user.email = profile.email;
    }
    return this.userRepository.save(user);
  }

  async updateCurrency(userId: string, currency: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException("User not found");
    }

    user.currency = currency;
    return await this.userRepository.save(user);
  }

  async updateIncomes(userId: string, incomes: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException("User not found");
    }

    user.incomes = incomes;
    return await this.userRepository.save(user);
  }

  async setOnboarded(userId: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException("User not found");
    }

    user.isOnboarded = true;
    return await this.userRepository.save(user);
  }
}
