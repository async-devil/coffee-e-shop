import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { typeOrmConfigBase } from "src/database/ormconfig";
import { ProductEditionEntity } from "src/entities/product-edition.entity";
import { AuthModule } from "src/modules/auth/auth.module";

import { ProductEditionsController } from "./product-editions.controller";
import { ProductEditionsRepository } from "./product-editions.repository";

@Module({
	imports: [
		TypeOrmModule.forRoot(typeOrmConfigBase()),
		TypeOrmModule.forFeature([ProductEditionEntity]),
		AuthModule,
	],
	controllers: [ProductEditionsController],
	providers: [ProductEditionsRepository],
	exports: [ProductEditionsRepository],
})
export class ProductEditionsModule {}
