import { MigrationInterface, QueryRunner } from "typeorm";

export class AddProductEntity1688679979107 implements MigrationInterface {
	name = "AddProductEntity1688679979107";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`--sql
      CREATE TABLE "product" (
        "id"          SERIAL NOT NULL,
        "category_id" integer NOT NULL,
        "archived"    boolean NOT NULL,
        "created_at"  TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),

        CONSTRAINT "REL_0dce9bc93c2d2c399982d04bef" UNIQUE ("category_id"),
        CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id")
			)`
		);

		await queryRunner.query(
			`--sql
			ALTER TABLE "product"
				ADD CONSTRAINT "FK_0dce9bc93c2d2c399982d04bef1" FOREIGN KEY ("category_id")
				REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
			`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "product" DROP CONSTRAINT "FK_0dce9bc93c2d2c399982d04bef1"`
		);
		await queryRunner.query(`DROP TABLE "product"`);
	}
}
