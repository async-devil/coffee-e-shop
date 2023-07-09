import { MigrationInterface, QueryRunner } from "typeorm";

export class AddProductTagEntity1688909383289 implements MigrationInterface {
	name = "AddProductTagEntity1688909383289";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`--sql
			CREATE TABLE "product_tag" (
				"id"         SERIAL NOT NULL,
				"product_id" integer NOT NULL,
				"tag_id"     integer NOT NULL,
				
				CONSTRAINT "PK_1439455c6528caa94fcc8564fda" PRIMARY KEY ("id")
			)`
		);

		await queryRunner.query(
			`--sql
			ALTER TABLE "product_tag"
				ADD CONSTRAINT "FK_d08cb260c60a9bf0a5e0424768d" FOREIGN KEY ("product_id")
				REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
			`
		);

		await queryRunner.query(
			`--sql
			ALTER TABLE "product_tag"
				ADD CONSTRAINT "FK_7bf0b673c19b33c9456d54b2b37" FOREIGN KEY ("tag_id")
				REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
			`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "product_tag" DROP CONSTRAINT "FK_7bf0b673c19b33c9456d54b2b37"`
		);

		await queryRunner.query(
			`ALTER TABLE "product_tag" DROP CONSTRAINT "FK_d08cb260c60a9bf0a5e0424768d"`
		);

		await queryRunner.query(`DROP TABLE "product_tag"`);
	}
}
