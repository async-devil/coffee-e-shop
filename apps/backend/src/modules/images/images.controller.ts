import { Body, Controller, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { AccessTokenGuard } from "src/guards/access-token.guard";

import { AddImageLinkDto } from "./dtos/add-image-link.dto";
import { CreateImageDto } from "./dtos/create-image.dto";
import { ImagesService } from "./images.service";

@ApiTags("images")
@Controller("images")
export class ImagesController {
	constructor(private readonly imagesService: ImagesService) {}

	@ApiBearerAuth()
	@Post("/upload")
	@UseGuards(AccessTokenGuard)
	@UseInterceptors(FileInterceptor("file"))
	public async uploadImage(@UploadedFile() file: Express.Multer.File, @Body() dto: CreateImageDto) {
		return await this.imagesService.uploadImage(file, dto);
	}

	@ApiBearerAuth()
	@Post("/add")
	@UseGuards(AccessTokenGuard)
	public async addImageLink(@Body() dto: AddImageLinkDto) {
		return await this.imagesService.addImageLink(dto.name, dto.url);
	}
}
