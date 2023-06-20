import { MigrationInterface, QueryRunner } from "typeorm";

export class AddImageEntity1677360510175 implements MigrationInterface {
	name = "AddImageEntity1677360510175";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`--sql
			CREATE TABLE "image" (
				"name"       text NOT NULL,
				"url"        text NOT NULL,
				"created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),

				CONSTRAINT "UQ_602959dc3010ff4b4805ee7f104" UNIQUE ("url"),
				CONSTRAINT "PK_e4dfc6a6f95452c9c931f5df487" PRIMARY KEY ("name")
			)
			`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "image"`);
	}
}
