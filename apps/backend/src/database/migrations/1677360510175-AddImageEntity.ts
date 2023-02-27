import { MigrationInterface, QueryRunner } from "typeorm";

export class AddImageEntity1677360510175 implements MigrationInterface {
	name = "AddImageEntity1677360510175";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`--sql
			CREATE TABLE "image" (
				"key"         text NOT NULL,
				"name"        text NOT NULL,
				"created_at"  TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),

				CONSTRAINT "PK_7c77ec1a4c00eda85540cbe57ae" PRIMARY KEY ("key")
			)
			`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "image"`);
	}
}
