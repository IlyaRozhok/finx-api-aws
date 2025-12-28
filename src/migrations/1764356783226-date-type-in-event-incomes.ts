import { MigrationInterface, QueryRunner } from "typeorm";

export class DateTypeInEventIncomes1764356783226 implements MigrationInterface {
    name = 'DateTypeInEventIncomes1764356783226'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event_incomes" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "event_incomes" ADD "date" TIMESTAMP WITH TIME ZONE NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event_incomes" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "event_incomes" ADD "date" date NOT NULL`);
    }

}
