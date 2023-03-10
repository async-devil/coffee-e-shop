import { randomUUID } from "crypto";

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CreateImageDto } from "./dtos/create-image.dto";
import { ImageFilesRepository } from "./imageFiles.repository";
import { ImageRecordsRepository } from "./imageRecords.repository";

@Injectable()
export class ImagesService {
	private readonly s3Client: S3Client;

	private readonly imagesBucketName = process.env.IMAGES_BUCKET_NAME;
	private readonly region = process.env.AWS_REGION || "us-east-1";

	/**
	 * Matches file extension with dot
	 * @example ".png"
	 */
	private readonly fileExtensionRegExp = new RegExp(/\.[0-9a-z]+$/i);

	constructor(
		private readonly imageFilesRepository: ImageFilesRepository,
		private readonly imageRecordsRepository: ImageRecordsRepository
	) {}

	public async uploadImage(file: Express.Multer.File, dto: CreateImageDto) {
		console.log(file);

		if (!file) {
			throw new BadRequestException("Image is not provided");
		}

		const extension = file.originalname.match(this.fileExtensionRegExp)[0];
		const name = dto.name || file.originalname.replace(extension, "");

		const key = `${randomUUID()}${extension}`;

		await this.imageFilesRepository.uploadFile(file.buffer, key);

		return await this.imageRecordsRepository.putRecord(key, name);
	}
}
