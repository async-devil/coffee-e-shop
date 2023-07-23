import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { typeOrmConfigBase } from "src/database/ormconfig";
import { ImageEntity } from "src/entities/image.entity";

import { ImageFilesRepository } from "./image-files.repository";
import { ImageRecordsRepository } from "./image-records.repository";
import { ImagesController } from "./images.controller";
import { ImagesService } from "./images.service";
import { AuthModule } from "../auth/auth.module";

@Module({
	imports: [
		TypeOrmModule.forRoot(typeOrmConfigBase()),
		TypeOrmModule.forFeature([ImageEntity]),
		AuthModule,
	],
	controllers: [ImagesController],
	providers: [ConfigService, ImageFilesRepository, ImageRecordsRepository, ImagesService],
	exports: [],
})
export class ImagesModule {}
