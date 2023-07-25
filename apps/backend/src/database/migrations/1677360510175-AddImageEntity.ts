import { MigrationInterface, QueryRunner } from "typeorm";

export class AddImageEntity1677360510175 implements MigrationInterface {
	name = "AddImageEntity1677360510175";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`--sql
			CREATE TABLE "image" (
				"id"         SERIAL NOT NULL,
				"name"       text NOT NULL,
				"url"        text NOT NULL,
				"is_owned"   boolean NOT NULL DEFAULT false,
				"created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
				
				CONSTRAINT "UQ_e4dfc6a6f95452c9c931f5df487" UNIQUE ("name"),
				CONSTRAINT "UQ_602959dc3010ff4b4805ee7f104" UNIQUE ("url"),
				CONSTRAINT "PK_d6db1ab4ee9ad9dbe86c64e4cc3" PRIMARY KEY ("id")
			)`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "image"`);
	}
}
