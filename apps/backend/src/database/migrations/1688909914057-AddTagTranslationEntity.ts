import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTagTranslationEntity1688909914057 implements MigrationInterface {
	name = "AddTagTranslationEntity1688909914057";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`--sql
			CREATE TABLE "tag_translation" (
				"id"       integer GENERATED BY DEFAULT AS IDENTITY NOT NULL,
				"language" character(2) NOT NULL,
				"tag_id"   integer NOT NULL,
				"name"     text NOT NULL,
				
				CONSTRAINT "UQ_c4a4c862e264f503f213530722d" UNIQUE ("tag_id", "language"),
				CONSTRAINT "PK_7c69db2b86c15b3175141d52aad" PRIMARY KEY ("id"),
				CONSTRAINT "FK_ae89a18d55a347cb32beb0216ae" FOREIGN KEY ("tag_id")
					REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE NO ACTION
			)`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "tag_translation"`);
	}
}
