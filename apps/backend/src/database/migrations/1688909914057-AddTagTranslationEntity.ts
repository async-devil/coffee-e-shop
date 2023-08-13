import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTagTranslationEntity1688909914057 implements MigrationInterface {
	name = "AddTagTranslationEntity1688909914057";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`--sql
			CREATE TABLE "tag_translation" (
				"id"       SERIAL NOT NULL,
				"tag_id"   integer NOT NULL,
				"language" character(2) NOT NULL,
				"name"     text NOT NULL,
				
				CONSTRAINT "UQ_f6f12459cd3244d0fe4d0006505" UNIQUE ("language"),
				CONSTRAINT "PK_7c69db2b86c15b3175141d52aad" PRIMARY KEY ("id")
			)`
		);

		await queryRunner.query(
			`--sql
			ALTER TABLE "tag_translation"
				ADD CONSTRAINT "FK_ae89a18d55a347cb32beb0216ae" FOREIGN KEY ("tag_id")
				REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE NO ACTION
			`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "tag_translation" DROP CONSTRAINT "FK_ae89a18d55a347cb32beb0216ae"`
		);

		await queryRunner.query(`DROP TABLE "tag_translation"`);
	}
}
