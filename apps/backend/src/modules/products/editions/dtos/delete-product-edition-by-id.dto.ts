import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString } from "class-validator";

export class DeleteProductEditionByIdDto {
	/** @example 1 */
	@IsNumberString()
	@ApiProperty({ example: 1 })
	public productId: number;

	/** @example 2 */
	@IsNumberString()
	@ApiProperty({ example: 2 })
	public id: number;
}
