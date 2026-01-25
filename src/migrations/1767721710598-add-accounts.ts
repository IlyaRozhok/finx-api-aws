import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAccounts1767721710598 implements MigrationInterface {
    name = 'AddAccounts1767721710598'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."account_type_enum" AS ENUM('card', 'cash', 'crypto')`);
        await queryRunner.query(`CREATE TABLE "account" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "type" "public"."account_type_enum" NOT NULL, "name" character varying(50) NOT NULL, "description" character varying(100) NOT NULL, "currency" character varying(3) NOT NULL, "provider" character varying(20) NOT NULL DEFAULT 'manual', "external_id" text, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "account_id" uuid`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_49c0d6e8ba4bfb5582000d851f0" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_49c0d6e8ba4bfb5582000d851f0"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "account_id"`);
        await queryRunner.query(`DROP TABLE "account"`);
        await queryRunner.query(`DROP TYPE "public"."account_type_enum"`);
    }

}
