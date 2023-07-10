import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOrderItemEntity1688940137547 implements MigrationInterface {
	name = "AddOrderItemEntity1688940137547";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`--sql
			CREATE TABLE "order_item" (
				"id"           SERIAL NOT NULL,
				"order_id"     integer NOT NULL,
				"product_id"   integer NOT NULL,
				"name"         text NOT NULL,
				"edition_name" text NOT NULL,
				"price"        numeric(7,2) NOT NULL,
				"amount"       integer NOT NULL,
				"total_price"  numeric(7,2) NOT NULL,
				
				CONSTRAINT "PK_d01158fe15b1ead5c26fd7f4e90" PRIMARY KEY ("id")
			)`
		);

		await queryRunner.query(
			`--sql
			ALTER TABLE "order_item"
				ADD CONSTRAINT "FK_e9674a6053adbaa1057848cddfa" FOREIGN KEY ("order_id")
				REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
			`
		);

		await queryRunner.query(
			`--sql
			ALTER TABLE "order_item"
				ADD CONSTRAINT "FK_5e17c017aa3f5164cb2da5b1c6b" FOREIGN KEY ("product_id")
				REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
			`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "order_item" DROP CONSTRAINT "FK_5e17c017aa3f5164cb2da5b1c6b"`
		);

		await queryRunner.query(
			`ALTER TABLE "order_item" DROP CONSTRAINT "FK_e9674a6053adbaa1057848cddfa"`
		);

		await queryRunner.query(`DROP TABLE "order_item"`);
	}
}