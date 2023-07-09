import { MigrationInterface, QueryRunner } from "typeorm";

export class AddProductEditionEntity1688727902946 implements MigrationInterface {
	name = "AddProductEditionEntity1688727902946";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`--sql
      CREATE TABLE "product_edition" (
        "id"         SERIAL NOT NULL,
        "product_id" integer NOT NULL,
        "name"       text NOT NULL,
        "price"      numeric(7,2) NOT NULL,
        "available"  boolean NOT NULL,
        
        CONSTRAINT "PK_25a21ffdeae9729dfb15d1ed2c5" PRIMARY KEY ("id")
      )`
		);

		await queryRunner.query(
			`--sql
      ALTER TABLE "product_edition"
        ADD CONSTRAINT "FK_8deaa2e2ec27ecdfc99f5c61adc" FOREIGN KEY ("product_id")
        REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
      `
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "product_edition" DROP CONSTRAINT "FK_8deaa2e2ec27ecdfc99f5c61adc"`
		);
		await queryRunner.query(`DROP TABLE "product_edition"`);
	}
}
