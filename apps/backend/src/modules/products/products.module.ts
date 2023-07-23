import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { typeOrmConfigBase } from "src/database/ormconfig";
import { ProductEditionEntity } from "src/entities/product-edition.entity";
import { ProductImageEntity } from "src/entities/product-image.entity";
import { ProductTagEntity } from "src/entities/product-tag.entity";
import { ProductTranslationEntity } from "src/entities/product-translation.entity";
import { ProductEntity } from "src/entities/product.entity";

import { ProductEditionsController } from "./editions/product-editions.controller";
import { ProductEditionsRepository } from "./editions/product-editions.repository";
import { ProductImagesController } from "./images/product-images.controller";
import { ProductImagesRepository } from "./images/product-images.repository";
import { ProductsController } from "./products.controller";
import { ProductsRepository } from "./products.repository";
import { ProductsService } from "./products.service";
import { ProductTagsController } from "./tags/product-tags.controller";
import { ProductTagsRepository } from "./tags/product-tags.repository";
import { ProductTranslationsController } from "./translations/product-translations.controller";
import { ProductTranslationsRepository } from "./translations/product-translations.repository";
import { AuthModule } from "../auth/auth.module";

@Module({
	imports: [
		TypeOrmModule.forRoot(typeOrmConfigBase()),
		TypeOrmModule.forFeature([
			ProductEntity,
			ProductTranslationEntity,
			ProductEditionEntity,
			ProductImageEntity,
			ProductTagEntity,
		]),
		AuthModule,
	],
	controllers: [
		ProductsController,
		ProductTranslationsController,
		ProductEditionsController,
		ProductImagesController,
		ProductTagsController,
	],
	providers: [
		ProductsService,
		ProductsRepository,
		ProductTranslationsRepository,
		ProductEditionsRepository,
		ProductImagesRepository,
		ProductTagsRepository,
	],
	exports: [],
})
export class ProductsModule {}
