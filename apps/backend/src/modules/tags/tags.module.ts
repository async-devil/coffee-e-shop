import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { typeOrmConfigBase } from "src/database/ormconfig";
import { TagEntity } from "src/entities/tag.entity";

import { TagsController } from "./tags.controller";
import { TagsRepository } from "./tags.repository";
import { AuthModule } from "../auth/auth.module";

@Module({
	imports: [
		TypeOrmModule.forRoot(typeOrmConfigBase()),
		TypeOrmModule.forFeature([TagEntity]),
		AuthModule,
	],
	controllers: [TagsController],
	providers: [TagsRepository],
	exports: [TagsRepository],
})
export class TagsModule {}
