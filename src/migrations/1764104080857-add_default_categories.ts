import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDefaultCategories1732555550000 implements MigrationInterface {
  name = "AddDefaultCategories1732555550000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO "categories" ("id", "user_id", "name") VALUES
        (uuid_generate_v4(), NULL, 'Family'),
        (uuid_generate_v4(), NULL, 'Transport'),
        (uuid_generate_v4(), NULL, 'Restaurant'),
        (uuid_generate_v4(), NULL, 'Personal Care'),
        (uuid_generate_v4(), NULL, 'Gifts'),
        (uuid_generate_v4(), NULL, 'Sport'),
        (uuid_generate_v4(), NULL, 'Food & Drinks'),
        (uuid_generate_v4(), NULL, 'Cinema'),
        (uuid_generate_v4(), NULL, 'Coffee or snacks'),
        (uuid_generate_v4(), NULL, 'House'),
        (uuid_generate_v4(), NULL, 'Telecommunication'),
        (uuid_generate_v4(), NULL, 'Health'),
        (uuid_generate_v4(), NULL, 'Emergency fund');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM "categories"
      WHERE "user_id" IS NULL
        AND "name" IN (
          'Family',
          'Transport',
          'Restaurant',
          'Personal Care',
          'Gifts',
          'Sport',
          'Food & Drinks',
          'Cinema',
          'Coffee or snacks',
          'House',
          'Telecommunication',
          'Health',
          'Emergency fund'
        );
    `);
  }
}
