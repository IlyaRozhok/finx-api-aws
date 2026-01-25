import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserIntegration1768247934570 implements MigrationInterface {
    name = 'AddUserIntegration1768247934570'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user-integrations_provider_enum" AS ENUM('monobank', 'privat_bank', 'revolut', 'binance', 'bybit')`);
        await queryRunner.query(`CREATE TYPE "public"."user-integrations_status_enum" AS ENUM('active', 'disabled', 'archived')`);
        await queryRunner.query(`CREATE TABLE "user-integrations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "provider" "public"."user-integrations_provider_enum" NOT NULL, "encrypted_token" text NOT NULL, "last_synced_at" TIMESTAMP WITH TIME ZONE, "status" "public"."user-integrations_status_enum" NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_d087596318316aeb7e50c8c84af" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "idx_user_integrations_status" ON "user-integrations" ("status") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "idx_user_integrations_user_provider" ON "user-integrations" ("user_id", "provider") `);
        await queryRunner.query(`CREATE INDEX "idx_user_integrations_user" ON "user-integrations" ("user_id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."idx_user_integrations_user"`);
        await queryRunner.query(`DROP INDEX "public"."idx_user_integrations_user_provider"`);
        await queryRunner.query(`DROP INDEX "public"."idx_user_integrations_status"`);
        await queryRunner.query(`DROP TABLE "user-integrations"`);
        await queryRunner.query(`DROP TYPE "public"."user-integrations_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."user-integrations_provider_enum"`);
    }

}
