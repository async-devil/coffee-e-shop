import {
	DeleteObjectCommand,
	GetObjectCommand,
	PutObjectCommand,
	S3Client,
} from "@aws-sdk/client-s3";
import { Injectable } from "@nestjs/common";

import { ConfigService } from "../../services/config.service";

@Injectable()
export class ImageFilesRepository {
	private readonly s3Client: S3Client;

	constructor(private readonly configService: ConfigService) {
		if (process.env.NODE_ENV === "development") {
			this.s3Client = new S3Client({
				credentials: {
					accessKeyId: process.env.AWS_ACCESS_KEY,
					secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
				},
				region: this.configService.AWSRegion,
			});
		} else {
			// production EC2 is allowed to use S3 without any access keys
			this.s3Client = new S3Client({ region: this.configService.AWSRegion });
		}
	}

	public getFileUrl(key: string) {
		return `https://s3.${this.configService.AWSRegion}.amazonaws.com/${this.configService.S3ImagesBucketName}/${key}`;
	}

	public async uploadFile(buffer: Buffer, key: string) {
		const command = new PutObjectCommand({
			Bucket: this.configService.S3ImagesBucketName,
			Body: buffer,
			Key: key,
		});

		return await this.s3Client.send(command);
	}

	public async getFile(key: string) {
		const command = new GetObjectCommand({
			Bucket: this.configService.S3ImagesBucketName,
			Key: key,
		});

		return await this.s3Client.send(command);
	}

	public async deleteFile(key: string) {
		const command = new DeleteObjectCommand({
			Bucket: this.configService.S3ImagesBucketName,
			Key: key,
		});

		return await this.s3Client.send(command);
	}
}
