import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { typeOrmConfigBase } from "src/database/ormconfig";
import { ProductEntity } from "src/entities/product.entity";

import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { AuthModule } from "../auth/auth.module";

@Module({
	imports: [
		TypeOrmModule.forRoot(typeOrmConfigBase()),
		TypeOrmModule.forFeature([ProductEntity]),
		AuthModule,
	],
	controllers: [ProductsController],
	providers: [ProductsService],
	exports: [],
})
export class ProductsModule {}
