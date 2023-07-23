import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUrl } from "class-validator";

export class AddImageLinkDto {
	/** @example "ethiopia-beans-1" */
	@IsString()
	@ApiProperty({ example: "ethiopia-beans-1" })
	public name: string;

	/** @example "https://website.com/ethiopia-beans-1.png" */
	@IsUrl()
	@ApiProperty({ example: "https://website.com/ethiopia-beans-1.png" })
	public url: string;
}
