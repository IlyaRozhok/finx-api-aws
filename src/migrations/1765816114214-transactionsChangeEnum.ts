import { MigrationInterface, QueryRunner } from "typeorm";

export class TransactionsChangeEnum1765816114214 implements MigrationInterface {
    name = 'TransactionsChangeEnum1765816114214'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."transaction_type" RENAME TO "transaction_type_old"`);
        await queryRunner.query(`CREATE TYPE "public"."transaction_type" AS ENUM('installment_payment', 'debt_payment', 'category_based', 'transfer', 'income_regular', 'income_event')`);
        await queryRunner.query(`ALTER TABLE "transactions" ALTER COLUMN "type" TYPE "public"."transaction_type" USING "type"::"text"::"public"."transaction_type"`);
        await queryRunner.query(`DROP TYPE "public"."transaction_type_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."transaction_type_old" AS ENUM('installment_payment', 'debt_payment', 'category_based', 'transfer')`);
        await queryRunner.query(`ALTER TABLE "transactions" ALTER COLUMN "type" TYPE "public"."transaction_type_old" USING "type"::"text"::"public"."transaction_type_old"`);
        await queryRunner.query(`DROP TYPE "public"."transaction_type"`);
        await queryRunner.query(`ALTER TYPE "public"."transaction_type_old" RENAME TO "transaction_type"`);
    }

}
