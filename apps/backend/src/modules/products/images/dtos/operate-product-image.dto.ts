import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString } from "class-validator";

export class OperateProductImageDto {
	/** @example 1 */
	@IsNumberString()
	@ApiProperty({ example: 1 })
	public productId: number;

	/** @example 1 */
	@IsNumberString()
	@ApiProperty({ example: 1 })
	public imageId: number;
}
