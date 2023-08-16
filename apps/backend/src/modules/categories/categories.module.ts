import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { typeOrmConfigBase } from "src/database/ormconfig";
import { CategoryEntity } from "src/entities/category.entity";

import { CategoriesController } from "./categories.controller";
import { CategoriesRepository } from "./categories.repository";
import { CategoryTranslationsModule } from "./translations/category-translations.module";
import { AuthModule } from "../auth/auth.module";

@Module({
	imports: [
		TypeOrmModule.forRoot(typeOrmConfigBase()),
		TypeOrmModule.forFeature([CategoryEntity]),
		AuthModule,
		CategoryTranslationsModule,
	],
	controllers: [CategoriesController],
	providers: [CategoriesRepository],
	exports: [CategoriesRepository],
})
export class CategoriesModule {}
