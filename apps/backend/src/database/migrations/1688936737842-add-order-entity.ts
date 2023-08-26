import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOrderEntity1688936737842 implements MigrationInterface {
	name = "AddOrderEntity1688936737842";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`--sql
			CREATE TYPE "public"."order_state" AS ENUM
				('created', 'processed', 'sent', 'suspended')
			`
		);

		await queryRunner.query(
			`--sql
			CREATE TABLE "order" (
				"id"           integer GENERATED BY DEFAULT AS IDENTITY NOT NULL,
				"key"          uuid NOT NULL DEFAULT uuid_generate_v4(),
				"state"        "public"."order_state" NOT NULL DEFAULT 'created',
				"email"        text NOT NULL,
				"phone_number" text NOT NULL,
				"first_name"   text NOT NULL,
				"last_name"    text NOT NULL,
				"middle_name"  text NOT NULL,
				"language"     character(2) NOT NULL,
				"total_price"  numeric(7,2) NOT NULL DEFAULT 0,
				"country"      character(2) NOT NULL,
				"region"       text NOT NULL,
				"city"         text NOT NULL,
				"address"      text NOT NULL,
				"zip_code"     text NOT NULL,
				"created_at"   TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
				
				CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"),
				CONSTRAINT "CHK_1320855f235dd813e0202625d3" CHECK ("total_price" >= 0)
			)`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "order"`);

		await queryRunner.query(`DROP TYPE "public"."order_state"`);
	}
}
