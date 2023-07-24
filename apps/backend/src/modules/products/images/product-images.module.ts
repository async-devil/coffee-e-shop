import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { typeOrmConfigBase } from "src/database/ormconfig";
import { ProductImageEntity } from "src/entities/product-image.entity";
import { AuthModule } from "src/modules/auth/auth.module";
import { ImagesModule } from "src/modules/images/images.module";

import { ProductImagesController } from "./product-images.controller";
import { ProductImagesRepository } from "./product-images.repository";

@Module({
	imports: [
		TypeOrmModule.forRoot(typeOrmConfigBase()),
		TypeOrmModule.forFeature([ProductImageEntity]),
		AuthModule,
		ImagesModule,
	],
	controllers: [ProductImagesController],
	providers: [ProductImagesRepository],
	exports: [ProductImagesRepository],
})
export class ProductImagesModule {}
