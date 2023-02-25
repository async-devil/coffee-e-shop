import { MigrationInterface, QueryRunner } from "typeorm";

export class AddImageEntity1677360510175 implements MigrationInterface {
	name = "AddImageEntity1677360510175";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`--sql
			CREATE TABLE "image" (
				"id"          SERIAL NOT NULL,
				"url"         text NOT NULL,
				"name"        text NOT NULL,
				"created_at"  TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),

				CONSTRAINT "UQ_bb4a3fd5ae972e77c7525d78e99" UNIQUE ("url"),
				CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id")
			)
			`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "image"`);
	}
}
