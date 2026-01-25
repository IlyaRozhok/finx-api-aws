import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStatusAccounts1768423445971 implements MigrationInterface {
    name = 'AddStatusAccounts1768423445971'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."accounts_status_enum" AS ENUM('active', 'disabled', 'archived')`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD "status" "public"."accounts_status_enum" NOT NULL DEFAULT 'active'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."accounts_status_enum"`);
    }

}
