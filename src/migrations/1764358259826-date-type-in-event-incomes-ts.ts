import { MigrationInterface, QueryRunner } from "typeorm";

export class DateTypeInEventIncomesTs1764358259826 implements MigrationInterface {
    name = 'DateTypeInEventIncomesTs1764358259826'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event_incomes" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "event_incomes" ADD "date" date NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event_incomes" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "event_incomes" ADD "date" TIMESTAMP WITH TIME ZONE NOT NULL`);
    }

}
