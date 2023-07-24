import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { typeOrmConfigBase } from "src/database/ormconfig";
import { ProductTranslationEntity } from "src/entities/product-translation.entity";
import { AuthModule } from "src/modules/auth/auth.module";

import { ProductTranslationsController } from "./product-translations.controller";
import { ProductTranslationsRepository } from "./product-translations.repository";

@Module({
	imports: [
		TypeOrmModule.forRoot(typeOrmConfigBase()),
		TypeOrmModule.forFeature([ProductTranslationEntity]),
		AuthModule,
	],
	controllers: [ProductTranslationsController],
	providers: [ProductTranslationsRepository],
	exports: [ProductTranslationsRepository],
})
export class ProductTranslationsModule {}
