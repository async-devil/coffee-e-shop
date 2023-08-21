import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	UploadedFile,
	UseFilters,
	UseGuards,
	UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiConsumes, ApiTags } from "@nestjs/swagger";

import { TypeORMErrorFilter } from "src/common/typeorm-error.filter";
import { AccessTokenGuard } from "src/guards/access-token.guard";

import { UploadImageRecordDto } from "./dtos/create-image-record.dto";
import { CreateImageDto } from "./dtos/create-image.dto";
import { OperateImageRecordByNameDto } from "./dtos/operate-image-record-by-name.dto";
import { UpdateImageRecordByNameBodyDto } from "./dtos/update-image-record-by-name.dto";
import { ImageRecordsRepository } from "./image-records.repository";
import { ImagesService } from "./images.service";

@ApiTags("images")
@Controller("images")
@UseFilters(TypeORMErrorFilter)
export class ImagesController {
	constructor(
		private readonly imagesService: ImagesService,
		private readonly imageRecordsRepository: ImageRecordsRepository
	) {}

	@ApiBearerAuth()
	@ApiConsumes("multipart/form-data")
	@Post("/")
	@UseGuards(AccessTokenGuard)
	@UseInterceptors(FileInterceptor("file"))
	public async uploadImage(@UploadedFile() file: Express.Multer.File, @Body() dto: CreateImageDto) {
		return await this.imagesService.uploadImage(file, dto);
	}

	@ApiBearerAuth()
	@Post("/records")
	@UseGuards(AccessTokenGuard)
	public async uploadImageRecord(@Body() dto: UploadImageRecordDto) {
		return await this.imageRecordsRepository.create(dto);
	}

	@Get("/records/:name")
	public async getImageRecordByName(@Param() parameters: OperateImageRecordByNameDto) {
		return await this.imageRecordsRepository.getByName(parameters);
	}

	@ApiBearerAuth()
	@Put("/records/:name")
	@UseGuards(AccessTokenGuard)
	public async updateImageRecordByName(
		@Param() parameters: OperateImageRecordByNameDto,
		@Body() body: UpdateImageRecordByNameBodyDto
	) {
		return await this.imageRecordsRepository.updateByName(Object.assign(body, parameters));
	}

	@ApiBearerAuth()
	@Delete("/records/:name")
	@UseGuards(AccessTokenGuard)
	public async deleteImageRecordByName(@Param() parameters: OperateImageRecordByNameDto) {
		return await this.imagesService.deleteImage(parameters);
	}
}
