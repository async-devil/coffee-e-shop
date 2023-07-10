import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { typeOrmConfigBase } from "src/database/ormconfig";
import { CategoryEntity } from "src/entities/category.entity";

import { CategoriesController } from "./categories.controller";
import { CategoriesService } from "./categories.service";
import { AuthModule } from "../auth/auth.module";

@Module({
	imports: [
		TypeOrmModule.forRoot(typeOrmConfigBase()),
		TypeOrmModule.forFeature([CategoryEntity]),
		AuthModule,
	],
	controllers: [CategoriesController],
	providers: [CategoriesService],
	exports: [],
})
export class CategoriesModule {}
