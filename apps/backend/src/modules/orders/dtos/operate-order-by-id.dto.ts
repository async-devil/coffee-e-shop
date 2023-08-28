import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString } from "class-validator";

export class OperateOrderByIdDto {
	/** @example 1 */
	@IsNumberString()
	@ApiProperty({ example: 1 })
	public id: number;
}
