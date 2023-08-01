import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateImageDto {
	/** @example "ethiopia-beans-1" */
	@IsString()
	@ApiProperty({ example: "ethiopia-beans-1" })
	public name: string;

	@ApiProperty({ type: "string", format: "binary", required: true })
	public file: Express.Multer.File;
}
