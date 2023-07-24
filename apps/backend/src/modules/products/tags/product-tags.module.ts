import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { typeOrmConfigBase } from "src/database/ormconfig";
import { ProductTagEntity } from "src/entities/product-tag.entity";
import { AuthModule } from "src/modules/auth/auth.module";
import { TagsModule } from "src/modules/tags/tags.module";

import { ProductTagsController } from "./product-tags.controller";
import { ProductTagsRepository } from "./product-tags.repository";

@Module({
	imports: [
		TypeOrmModule.forRoot(typeOrmConfigBase()),
		TypeOrmModule.forFeature([ProductTagEntity]),
		AuthModule,
		TagsModule,
	],
	controllers: [ProductTagsController],
	providers: [ProductTagsRepository],
	exports: [ProductTagsRepository],
})
export class ProductTagsModule {}
