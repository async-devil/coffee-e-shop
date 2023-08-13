import { MigrationInterface, QueryRunner } from "typeorm";

export class AddProductImageEntity1688730586667 implements MigrationInterface {
	name = "AddProductImageEntity1688730586667";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`--sql
			CREATE TABLE "product_image" (
				"product_id" integer NOT NULL,
				"image_id"   integer NOT NULL,

				CONSTRAINT "PK_4eb46245c9049493d4381daa806" PRIMARY KEY ("product_id", "image_id")
			)`
		);

		await queryRunner.query(
			`CREATE INDEX "IDX_dbc7d9aa7ed42c9141b968a9ed" ON "product_image" ("product_id")`
		);

		await queryRunner.query(
			`CREATE INDEX "IDX_d51e7dc05190034e8c9c647669" ON "product_image" ("image_id")`
		);

		await queryRunner.query(
			`--sql
			ALTER TABLE "product_image"
				ADD CONSTRAINT "FK_dbc7d9aa7ed42c9141b968a9ed3" FOREIGN KEY ("product_id")
				REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION
			`
		);

		await queryRunner.query(
			`--sql
			ALTER TABLE "product_image"
				ADD CONSTRAINT "FK_d51e7dc05190034e8c9c6476699" FOREIGN KEY ("image_id")
				REFERENCES "image"("id") ON DELETE CASCADE ON UPDATE NO ACTION
			`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "product_image" DROP CONSTRAINT "FK_d51e7dc05190034e8c9c6476699"`
		);

		await queryRunner.query(
			`ALTER TABLE "product_image" DROP CONSTRAINT "FK_dbc7d9aa7ed42c9141b968a9ed3"`
		);

		await queryRunner.query(`DROP INDEX "public"."IDX_d51e7dc05190034e8c9c647669"`);

		await queryRunner.query(`DROP INDEX "public"."IDX_dbc7d9aa7ed42c9141b968a9ed"`);

		await queryRunner.query(`DROP TABLE "product_image"`);
	}
}
