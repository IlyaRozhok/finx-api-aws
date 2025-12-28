import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeTransactionsEntity1765722528812 implements MigrationInterface {
    name = 'ChangeTransactionsEntity1765722528812'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_e9acc6efa76de013e8c1553ed2b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_97ff86c4b451237920f18c5421"`);
        await queryRunner.query(`CREATE TYPE "public"."transaction_direction" AS ENUM('income', 'expense')`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "direction" "public"."transaction_direction" NOT NULL`);
        await queryRunner.query(`ALTER TYPE "public"."transaction_type" RENAME TO "transaction_type_old"`);
        await queryRunner.query(`CREATE TYPE "public"."transaction_type" AS ENUM('installment_payment', 'debt_payment', 'category_based', 'transfer')`);
        await queryRunner.query(`ALTER TABLE "transactions" ALTER COLUMN "type" TYPE "public"."transaction_type" USING "type"::"text"::"public"."transaction_type"`);
        await queryRunner.query(`DROP TYPE "public"."transaction_type_old"`);
        await queryRunner.query(`CREATE INDEX "idx_transactions_user_occurred_at" ON "transactions" ("occurred_at") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."idx_transactions_user_occurred_at"`);
        await queryRunner.query(`CREATE TYPE "public"."transaction_type_old" AS ENUM('income', 'expense', 'installment_payment', 'debt_payment', 'transfer')`);
        await queryRunner.query(`ALTER TABLE "transactions" ALTER COLUMN "type" TYPE "public"."transaction_type_old" USING "type"::"text"::"public"."transaction_type_old"`);
        await queryRunner.query(`DROP TYPE "public"."transaction_type"`);
        await queryRunner.query(`ALTER TYPE "public"."transaction_type_old" RENAME TO "transaction_type"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "direction"`);
        await queryRunner.query(`DROP TYPE "public"."transaction_direction"`);
        await queryRunner.query(`CREATE INDEX "IDX_97ff86c4b451237920f18c5421" ON "transactions" ("occurred_at") `);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_e9acc6efa76de013e8c1553ed2b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
