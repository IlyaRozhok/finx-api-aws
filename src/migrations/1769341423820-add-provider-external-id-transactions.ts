import { MigrationInterface, QueryRunner } from "typeorm";

export class AddProviderExternalIdTransactions1769341423820 implements MigrationInterface {
    name = 'AddProviderExternalIdTransactions1769341423820'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."idx_transactions_user_occurred_at"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "external_id" text`);
        await queryRunner.query(`CREATE TYPE "public"."transactions_provider_enum" AS ENUM('manual', 'monobank', 'binance')`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "provider" "public"."transactions_provider_enum" NOT NULL DEFAULT 'manual'`);
        await queryRunner.query(`CREATE INDEX "idx_tx_user_category_occurred" ON "transactions" ("user_id", "category_id", "occurred_at") `);
        await queryRunner.query(`CREATE INDEX "idx_tx_user_account_occurred" ON "transactions" ("user_id", "account_id", "occurred_at") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "uniq_tx_provider_external" ON "transactions" ("user_id", "provider", "external_id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."uniq_tx_provider_external"`);
        await queryRunner.query(`DROP INDEX "public"."idx_tx_user_account_occurred"`);
        await queryRunner.query(`DROP INDEX "public"."idx_tx_user_category_occurred"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "provider"`);
        await queryRunner.query(`DROP TYPE "public"."transactions_provider_enum"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "external_id"`);
        await queryRunner.query(`CREATE INDEX "idx_transactions_user_occurred_at" ON "transactions" ("occurred_at") `);
    }

}
