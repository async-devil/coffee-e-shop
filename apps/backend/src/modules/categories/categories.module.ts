import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { typeOrmConfigBase } from "src/database/ormconfig";
import { CategoryEntity } from "src/entities/category.entity";

import { AuthModule } from "../auth/auth.module";

@Module({
	imports: [
		TypeOrmModule.forRoot(typeOrmConfigBase()),
		TypeOrmModule.forFeature([CategoryEntity]),
		AuthModule,
	],
	controllers: [],
	providers: [],
	exports: [],
})
export class CategoriesModule {}
