import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeColumnsIncomesToAmount1764108691973 implements MigrationInterface {
    name = 'ChangeColumnsIncomesToAmount1764108691973'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "regular_incomes" RENAME COLUMN "incomes" TO "amount"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "regular_incomes" RENAME COLUMN "amount" TO "incomes"`);
    }

}
