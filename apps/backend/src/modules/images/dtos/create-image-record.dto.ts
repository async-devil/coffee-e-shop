import { ApiProperty, OmitType } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString, IsUrl } from "class-validator";

export class CreateImageRecordDto {
	/** @example "ethiopia-beans-1" */
	@IsString()
	@ApiProperty({ example: "ethiopia-beans-1" })
	public name: string;

	/** @example "https://website.com/ethiopia-beans-1.png" */
	@IsUrl()
	@ApiProperty({ example: "https://website.com/ethiopia-beans-1.png" })
	public url: string;

	/** @example true */
	@IsBoolean()
	@IsOptional()
	@ApiProperty({ example: true })
	public is_owned?: boolean;
}

export class UploadImageRecordDto extends OmitType(CreateImageRecordDto, ["is_owned"]) {}
