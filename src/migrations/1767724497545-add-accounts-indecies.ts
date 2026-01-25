import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAccountsIndecies1767724497545 implements MigrationInterface {
    name = 'AddAccountsIndecies1767724497545'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_49c0d6e8ba4bfb5582000d851f0"`);
        await queryRunner.query(`CREATE TYPE "public"."accounts_type_enum" AS ENUM('card', 'cash', 'wallet')`);
        await queryRunner.query(`CREATE TYPE "public"."accounts_provider_enum" AS ENUM('manual', 'monobank', 'binance')`);
        await queryRunner.query(`CREATE TYPE "public"."accounts_asset_type_enum" AS ENUM('fiat', 'crypto')`);
        await queryRunner.query(`CREATE TABLE "accounts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "type" "public"."accounts_type_enum" NOT NULL, "name" character varying(50) NOT NULL, "description" character varying(100), "asset_code" character varying(10) NOT NULL, "provider" "public"."accounts_provider_enum" NOT NULL DEFAULT 'manual', "asset_type" "public"."accounts_asset_type_enum" NOT NULL DEFAULT 'fiat', "external_id" text, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_5a7a02c20412299d198e097a8fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "idx_accounts_user" ON "accounts" ("user_id") `);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_49c0d6e8ba4bfb5582000d851f0" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_49c0d6e8ba4bfb5582000d851f0"`);
        await queryRunner.query(`DROP INDEX "public"."idx_accounts_user"`);
        await queryRunner.query(`DROP TABLE "accounts"`);
        await queryRunner.query(`DROP TYPE "public"."accounts_asset_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."accounts_provider_enum"`);
        await queryRunner.query(`DROP TYPE "public"."accounts_type_enum"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_49c0d6e8ba4bfb5582000d851f0" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

}
