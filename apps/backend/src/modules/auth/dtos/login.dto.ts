import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class LoginDto {
	/** @example "password" */
	@IsString()
	@ApiProperty({ example: "password" })
	public password: string;
}
