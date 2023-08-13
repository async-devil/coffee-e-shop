import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCategoryTranslationEntity1688680257385 implements MigrationInterface {
	name = "AddCategoryTranslationEntity1688680257385";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`--sql
			CREATE TABLE "category_translation" (
				"id"          SERIAL NOT NULL,
				"category_id" integer NOT NULL,
				"language"    character(2) NOT NULL,
				"name"        text NOT NULL,
				"text"        text NOT NULL,

				CONSTRAINT "UQ_f89edb2f7e0d8e15a569bb70131" UNIQUE ("language"),
				CONSTRAINT "PK_eeafea0891382f348c30a2a6bc2" PRIMARY KEY ("id")
			)`
		);

		await queryRunner.query(
			`--sql
			ALTER TABLE "category_translation"
				ADD CONSTRAINT "FK_e2c538aafd6262f061936460f1d" FOREIGN KEY ("category_id")
				REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE NO ACTION
			`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "category_translation" DROP CONSTRAINT "FK_e2c538aafd6262f061936460f1d"`
		);

		await queryRunner.query(`DROP TABLE "category_translation"`);
	}
}
