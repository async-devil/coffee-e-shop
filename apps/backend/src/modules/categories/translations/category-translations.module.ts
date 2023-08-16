import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { typeOrmConfigBase } from "src/database/ormconfig";
import { CategoryTranslationEntity } from "src/entities/category-translation.entity";
import { AuthModule } from "src/modules/auth/auth.module";

import { CategoryTranslationsController } from "./category-translations.controller";
import { CategoryTranslationsRepository } from "./category-translations.repository";

@Module({
	imports: [
		TypeOrmModule.forRoot(typeOrmConfigBase()),
		TypeOrmModule.forFeature([CategoryTranslationEntity]),
		AuthModule,
	],
	controllers: [CategoryTranslationsController],
	providers: [CategoryTranslationsRepository],
	exports: [CategoryTranslationsRepository],
})
export class CategoryTranslationsModule {}
