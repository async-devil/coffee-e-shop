import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";

import { CreateImageDto } from "./dtos/create-image.dto";
import { ImagesService } from "./images.service";

@Controller("images")
export class ImagesController {
	constructor(private readonly imagesService: ImagesService) {}

	@Post("/upload")
	@UseInterceptors(FileInterceptor("file"))
	public async uploadImage(@UploadedFile() file: Express.Multer.File, @Body() dto: CreateImageDto) {
		return await this.imagesService.uploadImage(file, dto);
	}
}
