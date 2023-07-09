import { MigrationInterface, QueryRunner } from "typeorm";

export class AddProductTranslationEntity1688909309117 implements MigrationInterface {
	name = "AddProductTranslationEntity1688909309117";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`--sql
			CREATE TABLE "product_translation" (
				"id"                  SERIAL NOT NULL,
				"product_id"          integer NOT NULL,
				"language"            character(2) NOT NULL,
				"name"                text NOT NULL,
				"description"         text NOT NULL,
				"preview_description" text NOT NULL,
				"text"                text NOT NULL,
				
				CONSTRAINT "UQ_8d3e3bbb7f838cdf32c1c5cc092" UNIQUE ("language"),
				CONSTRAINT "PK_62d00fbc92e7a495701d6fee9d5" PRIMARY KEY ("id")
			)`
		);

		await queryRunner.query(
			`--sql
			ALTER TABLE "product_translation"
				ADD CONSTRAINT "FK_045befe4da0d3c207a981f4e88b" FOREIGN KEY ("product_id")
				REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
			`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "product_translation" DROP CONSTRAINT "FK_045befe4da0d3c207a981f4e88b"`
		);

		await queryRunner.query(`DROP TABLE "product_translation"`);
	}
}
