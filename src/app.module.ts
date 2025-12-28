import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { OnboadingModule } from "./onboarding/onboarding.module";
import { DebtsModule } from "./debts/debts.module";
import { RecurringExpensesModule } from "@/expenses/recurring-expenses.module";
import { InstallmentsModule } from "./installments/installments.module";
import { TransactionsModule } from "./transactions/transactions.module";
import { envFileMap } from "./shared/envFileMap";
import { StatsModule } from "./stats/stats.module";
import { LivenessController } from "./liveness.controller";
import { RegularIncomesModule } from "./incomes/regular-incomes/regular-incomes.module";
import { EventIncomesModule } from "./incomes/event-incomes/event-incomes.module";
import { MonobankModule } from "@/integrations/monobank/monobank.module";
import { AccountsModule } from './accounts/accounts.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: envFileMap[process.env.NODE_ENV ?? "development"],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: "postgres",
          host: configService.getOrThrow<string>("PG_HOST"),
          port: parseInt(configService.getOrThrow<string>("PG_PORT")),
          username: configService.getOrThrow<string>("PG_USER"),
          password: configService.getOrThrow<string>("PG_PASSWORD"),
          database: configService.getOrThrow<string>("PG_DBNAME"),
          entities: [__dirname + "/**/*.entity{.ts,.js}"],
          synchronize: false,
          autoLoadEntities: true,
        };
      },
    }),
    AuthModule,
    UsersModule,
    OnboadingModule,
    DebtsModule,
    RecurringExpensesModule,
    InstallmentsModule,
    TransactionsModule,
    StatsModule,
    RegularIncomesModule,
    EventIncomesModule,
    MonobankModule,
    AccountsModule,
  ],
  controllers: [LivenessController],
})
export class AppModule {}
