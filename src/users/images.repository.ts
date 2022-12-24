import { Injectable } from "@nestjs/common";
import { S3 } from "aws-sdk";

@Injectable()
export class ImagesRepository {
	private readonly s3: S3;

	private readonly imagesBucketName = process.env.IMAGES_BUCKET_NAME;

	constructor() {
		if (process.env.IS_OFFLINE === "true") {
			this.s3 = new S3({
				s3ForcePathStyle: true,
				endpoint: process.env.S3_ENDPOINT,
				accessKeyId: "S3RVER", // This specific key is required when working offline
				secretAccessKey: "S3RVER",
			});
		} else {
			this.s3 = new S3();
		}
	}

	public async putBlob(key: string, blob: Buffer) {
		return await this.s3
			.putObject({
				Bucket: this.imagesBucketName,
				Key: key,
				Body: blob,
			})
			.promise();
	}

	public async getBlob(key: string) {
		return await this.s3
			.getObject({
				Bucket: this.imagesBucketName,
				Key: key,
			})
			.promise();
	}
}
