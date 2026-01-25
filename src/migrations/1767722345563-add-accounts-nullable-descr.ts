import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAccountsNullableDescr1767722345563 implements MigrationInterface {
    name = 'AddAccountsNullableDescr1767722345563'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" ALTER COLUMN "description" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" ALTER COLUMN "description" SET NOT NULL`);
    }

}
