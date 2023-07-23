import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreateImageDto {
	/** @example "ethiopia-beans-1" */
	@IsOptional()
	@IsString()
	@ApiProperty({ required: false, example: "ethiopia-beans-1" })
	public name?: string;
}
