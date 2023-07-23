import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString } from "class-validator";

export class GetProductEditionByIdDto {
	/** @example 1 */
	@IsNumberString()
	@ApiProperty({ example: 1 })
	public product_id: number;

	/** @example 2 */
	@IsNumberString()
	@ApiProperty({ example: 2 })
	public id: number;
}
