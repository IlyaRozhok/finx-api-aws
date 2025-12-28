import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIncomes1764107298005 implements MigrationInterface {
    name = 'AddIncomes1764107298005'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "regular_incomes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "incomes" integer NOT NULL, "description" character varying(50) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), CONSTRAINT "PK_709aac96c7566f88d14d56f27c4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "event_incomes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "amount" integer NOT NULL, "description" character varying(50) NOT NULL, "date" date NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), CONSTRAINT "PK_18e7910e57aff9a465d2dcf67ad" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "event_incomes"`);
        await queryRunner.query(`DROP TABLE "regular_incomes"`);
    }

}
