import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNumber, Min } from "class-validator";

import { IsISO639Alpha2 } from "src/common/iso639-alpha2.validator";

export class CreateOrderItemDto {
	/** @example 1 */
	@IsNumber()
	@ApiProperty({ example: 1 })
	public orderId: number;

	/** @example 1 */
	@IsNumber()
	@ApiProperty({ example: 1 })
	public productId: number;

	/** @example 1 */
	@IsNumber()
	@ApiProperty({ example: 1 })
	public productEditionId: number;

	/** @example 1 */
	@IsInt()
	@Min(1)
	@ApiProperty({ example: 1, minimum: 1 })
	public amount: number;

	/** ISO 639-1 @example "en" */
	@IsISO639Alpha2()
	@ApiProperty({ description: "ISO 639-1", example: "en" })
	public language: string;
}
