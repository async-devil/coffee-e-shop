import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTagEntity1688909348988 implements MigrationInterface {
	name = "AddTagEntity1688909348988";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`--sql
			CREATE TABLE "tag" (
				"id" SERIAL NOT NULL,

				CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id")
			)`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "tag"`);
	}
}
