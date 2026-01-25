import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "@/modules/auth/auth.module";
import { UsersModule } from "@/modules/users/users.module";
import { OnboadingModule } from "@/modules/onboarding/onboarding.module";
import { DebtsModule } from "@/modules/plan/debts/debts.module";
import { RecurringExpensesModule } from "@/modules/plan/expenses/recurring-expenses.module";
import { InstallmentsModule } from "@/modules/plan/installments/installments.module";
import { TransactionsModule } from "@/modules/transactions/transactions.module";
import { envFileMap } from "@/shared/envFileMap";
import { StatsModule } from "@/modules/stats/stats.module";
import { LivenessController } from "@/liveness.controller";
import { RegularIncomesModule } from "@/modules/plan/incomes/regular-incomes/regular-incomes.module";
import { EventIncomesModule } from "@/modules/plan/incomes/event-incomes/event-incomes.module";
import { MonobankModule } from "@/modules/external/monobank/monobank.module";
import { AccountsModule } from "@/modules/accounts/accounts.module";
import { UserIntegrationModule } from "@/modules/user-integration/user-integration.module";


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
    UserIntegrationModule,
  ],
  controllers: [LivenessController],
})
export class AppModule {}
