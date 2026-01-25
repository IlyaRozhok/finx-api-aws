import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserIntegration1768248088452 implements MigrationInterface {
    name = 'UpdateUserIntegration1768248088452'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user-integrations" ALTER COLUMN "status" SET DEFAULT 'active'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user-integrations" ALTER COLUMN "status" DROP DEFAULT`);
    }

}
