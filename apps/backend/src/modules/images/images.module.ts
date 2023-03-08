import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { typeOrmConfigBase } from "src/database/ormconfig";
import { ImageEntity } from "src/entities/image.entity";

import { ImageFilesRepository } from "./imageFiles.repository";
import { ImageRecordsRepository } from "./imageRecords.repository";
import { ImagesController } from "./images.controller";
import { ImagesService } from "./images.service";

@Module({
	imports: [TypeOrmModule.forRoot(typeOrmConfigBase()), TypeOrmModule.forFeature([ImageEntity])],
	controllers: [ImagesController],
	providers: [ConfigService, ImageFilesRepository, ImageRecordsRepository, ImagesService],
	exports: [],
})
export class ImagesModule {}
