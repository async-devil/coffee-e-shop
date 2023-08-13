import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { typeOrmConfigBase } from "src/database/ormconfig";
import { TagTranslationEntity } from "src/entities/tag-translation.entity";
import { AuthModule } from "src/modules/auth/auth.module";

import { TagTranslationsController } from "./tag-translations.controller";
import { TagTranslationsRepository } from "./tag-translations.repository";

@Module({
	imports: [
		TypeOrmModule.forRoot(typeOrmConfigBase()),
		TypeOrmModule.forFeature([TagTranslationEntity]),
		AuthModule,
	],
	controllers: [TagTranslationsController],
	providers: [TagTranslationsRepository],
	exports: [TagTranslationsRepository],
})
export class TagTranslationsModule {}
