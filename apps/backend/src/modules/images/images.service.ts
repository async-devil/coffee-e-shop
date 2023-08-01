import { randomUUID } from "crypto";

import { S3Client } from "@aws-sdk/client-s3";
import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";

import { CreateImageDto } from "./dtos/create-image.dto";
import { OperateImageRecordByNameDto } from "./dtos/operate-image-record-by-name.dto";
import { ImageFilesRepository } from "./image-files.repository";
import { ImageRecordsRepository } from "./image-records.repository";

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
		private readonly filesRepository: ImageFilesRepository,
		private readonly recordsRepository: ImageRecordsRepository
	) {}

	public async uploadImage(file: Express.Multer.File, dto: CreateImageDto) {
		if (!file) {
			throw new BadRequestException("Image is not provided");
		}

		const dotExtension = file.originalname.match(this.fileExtensionRegExp)[0];
		const key = `${randomUUID()}${dotExtension}`;

		await this.filesRepository.upload(file.buffer, key);

		try {
			await this.recordsRepository.create({
				name: dto.name,
				url: this.filesRepository.getUrl(key),
				is_owned: true,
			});
		} catch (err) {
			await this.filesRepository.delete(key);

			throw new InternalServerErrorException();
		}
	}

	public async deleteImage(dto: OperateImageRecordByNameDto) {
		const image = await this.recordsRepository.getByName(dto);

		if (image.is_owned) {
			const key = this.filesRepository.getKey(image.url);

			await this.filesRepository.delete(key);
		}

		return await this.recordsRepository.deleteByName(dto);
	}
}
