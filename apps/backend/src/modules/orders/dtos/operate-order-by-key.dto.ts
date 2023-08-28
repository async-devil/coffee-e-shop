import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class OperateOrderByKeyDto {
	/** @example "123e4567-e89b-12d3-a456-426655440000" */
	@IsUUID()
	@ApiProperty({ example: "123e4567-e89b-12d3-a456-426655440000" })
	public key: string;
}
