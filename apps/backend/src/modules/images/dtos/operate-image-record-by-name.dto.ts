import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsString } from "class-validator";

export class OperateImageRecordByNameDto {
	/**
	 * URL encoded string
	 * @example "Coffee%20bag%20%22Night%20shift%22"
	 */
	@IsString()
	@Transform(({ value }) => decodeURI(value as string))
	@ApiProperty({ description: "URL encoded string", example: "Coffee%20bag%20%22Night%20shift%22" })
	public name: string;
}
