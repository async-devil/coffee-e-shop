import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { typeOrmConfigBase } from "src/database/ormconfig";
import { ProductEntity } from "src/entities/product.entity";

import { ProductEditionsModule } from "./editions/product-editions.module";
import { ProductImagesModule } from "./images/product-images.module";
import { ProductsController } from "./products.controller";
import { ProductsRepository } from "./products.repository";
import { ProductTagsModule } from "./tags/product-tags.module";
import { ProductTranslationsModule } from "./translations/product-translations.module";
import { AuthModule } from "../auth/auth.module";

@Module({
	imports: [
		TypeOrmModule.forRoot(typeOrmConfigBase()),
		TypeOrmModule.forFeature([ProductEntity]),
		AuthModule,
		ProductTranslationsModule,
		ProductEditionsModule,
		ProductImagesModule,
		ProductTagsModule,
	],
	controllers: [ProductsController],
	providers: [ProductsRepository],
	exports: [ProductsRepository],
})
export class ProductsModule {}
