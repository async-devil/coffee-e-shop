import { Injectable } from "@nestjs/common";

@Injectable()
export class ConfigService {
	public readonly S3ImagesBucketName = process.env.IMAGES_BUCKET_NAME;
	public readonly AWSRegion = process.env.AWS_REGION || "us-east-1";
}
