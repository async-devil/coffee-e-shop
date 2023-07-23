import {
	DeleteObjectCommand,
	GetObjectCommand,
	PutObjectCommand,
	S3Client,
} from "@aws-sdk/client-s3";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class ImageFilesRepository {
	private readonly s3Client: S3Client;

	private readonly region = this.configService.get<string>("aws.region");
	private readonly imagesBucketName = this.configService.get<string>("s3.imagesBucketName");

	constructor(private readonly configService: ConfigService) {
		if (process.env.NODE_ENV === "development") {
			this.s3Client = new S3Client({
				credentials: {
					accessKeyId: this.configService.get("aws.accessKey"),
					secretAccessKey: this.configService.get("aws.secretKey"),
				},
				region: this.region,
			});
		} else {
			// production EC2 is allowed to use S3 without any access keys
			this.s3Client = new S3Client({ region: this.region });
		}
	}

	public getFileUrl(key: string) {
		return `https://s3.${this.region}.amazonaws.com/${this.imagesBucketName}/${key}`;
	}

	public async uploadFile(buffer: Buffer, key: string) {
		const command = new PutObjectCommand({
			Bucket: this.imagesBucketName,
			Body: buffer,
			Key: key,
		});

		return await this.s3Client.send(command);
	}

	public async getFile(key: string) {
		const command = new GetObjectCommand({
			Bucket: this.imagesBucketName,
			Key: key,
		});

		return await this.s3Client.send(command);
	}

	public async deleteFile(key: string) {
		const command = new DeleteObjectCommand({
			Bucket: this.imagesBucketName,
			Key: key,
		});

		return await this.s3Client.send(command);
	}
}
