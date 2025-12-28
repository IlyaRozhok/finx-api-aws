import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIconToCategories1764104840119 implements MigrationInterface {
    name = 'AddIconToCategories1764104840119'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" ADD "icon" character varying(32)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "icon"`);
    }

}
