import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCategoryEntity1688679570275 implements MigrationInterface {
	name = "AddCategoryEntity1688679570275";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`--sql
      CREATE TABLE "category" (
        "id"         SERIAL NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        
        CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id")
      )`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "category"`);
	}
}
