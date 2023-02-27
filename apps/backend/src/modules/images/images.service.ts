import { randomUUID } from "crypto";

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { ImageEntity } from "src/entities/image.entity";

import { CreateImageDto } from "./dtos/create-image.dto";

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
		@InjectRepository(ImageEntity) private readonly imageRepository: Repository<ImageEntity>
	) {
		if (process.env.NODE_ENV === "development") {
			this.s3Client = new S3Client({
				credentials: {
					accessKeyId: process.env.AWS_ACCESS_KEY,
					secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
				},
				region: this.region,
			});
		} else {
			// EC2 is allowed to use S3 without any access keys
			this.s3Client = new S3Client({ region: this.region });
		}
	}

	public async uploadImage(file: Express.Multer.File, dto: CreateImageDto) {
		console.log(file);

		if (!file) {
			throw new BadRequestException("Image is not provided");
		}

		const extension = file.originalname.match(this.fileExtensionRegExp)[0];
		const name = dto.name || file.originalname.replace(extension, "");

		const key = `${randomUUID()}${extension}`;

		await this.uploadFile(file.buffer, key);

		return await this.addImageRecord(name, key);
	}

	public async uploadFile(fileBuffer: Buffer, key: string) {
		const command = new PutObjectCommand({
			Bucket: this.imagesBucketName,
			Body: fileBuffer,
			Key: key,
		});

		return await this.s3Client.send(command);
	}

	public async addImageRecord(name: string, key: string) {
		return await this.imageRepository.save({
			name,
			url: `https://s3.${this.region}.amazonaws.com/${this.imagesBucketName}/${key}`,
		});
	}
}
