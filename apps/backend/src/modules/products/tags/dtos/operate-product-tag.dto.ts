import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString } from "class-validator";

export class OperateProductTagDto {
	@IsNumberString()
	@ApiProperty({ example: 1 })
	public productId: number;

	/** @example 1 */
	@IsNumberString()
	@ApiProperty({ example: 1 })
	public tagId: number;
}
