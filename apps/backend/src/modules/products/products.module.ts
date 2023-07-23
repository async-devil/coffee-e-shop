import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { typeOrmConfigBase } from "src/database/ormconfig";
import { ProductEditionEntity } from "src/entities/product-edition.entity";
import { ProductImageEntity } from "src/entities/product-image.entity";
import { ProductTranslationEntity } from "src/entities/product-translation.entity";
import { ProductEntity } from "src/entities/product.entity";

import { ProductsController } from "./products.controller";
import { ProductsRepository } from "./products.repository";
import { ProductsService } from "./products.service";
import { ProductTranslationsController } from "./translations/product-translations.controller";
import { ProductTranslationsRepository } from "./translations/product-translations.repository";
import { AuthModule } from "../auth/auth.module";

@Module({
	imports: [
		TypeOrmModule.forRoot(typeOrmConfigBase()),
		TypeOrmModule.forFeature([
			ProductEntity,
			ProductEditionEntity,
			ProductTranslationEntity,
			ProductImageEntity,
		]),
		AuthModule,
	],
	controllers: [ProductsController, ProductTranslationsController],
	providers: [ProductsService, ProductsRepository, ProductTranslationsRepository],
	exports: [],
})
export class ProductsModule {}
