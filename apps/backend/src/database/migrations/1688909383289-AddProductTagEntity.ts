import { MigrationInterface, QueryRunner } from "typeorm";

export class AddProductTagEntity1688909383289 implements MigrationInterface {
	name = "AddProductTagEntity1688909383289";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`--sql
			CREATE TABLE "product_tag" (
				"product_id" integer NOT NULL,
				"tag_id"     integer NOT NULL,
				
				CONSTRAINT "PK_5e6a58e9623ea046dbe0a1d43da" PRIMARY KEY ("product_id", "tag_id")
			)`
		);

		await queryRunner.query(
			`CREATE INDEX "IDX_d08cb260c60a9bf0a5e0424768" ON "product_tag" ("product_id") `
		);

		await queryRunner.query(
			`CREATE INDEX "IDX_7bf0b673c19b33c9456d54b2b3" ON "product_tag" ("tag_id") `
		);

		await queryRunner.query(
			`--sql
			ALTER TABLE "product_tag"
				ADD CONSTRAINT "FK_d08cb260c60a9bf0a5e0424768d" FOREIGN KEY ("product_id")
				REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION
			`
		);

		await queryRunner.query(
			`--sql
			ALTER TABLE "product_tag"
				ADD CONSTRAINT "FK_7bf0b673c19b33c9456d54b2b37" FOREIGN KEY ("tag_id")
				REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE NO ACTION
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

		await queryRunner.query(`DROP INDEX "public"."IDX_7bf0b673c19b33c9456d54b2b3"`);

		await queryRunner.query(`DROP INDEX "public"."IDX_d08cb260c60a9bf0a5e0424768"`);

		await queryRunner.query(`DROP TABLE "product_tag"`);
	}
}
