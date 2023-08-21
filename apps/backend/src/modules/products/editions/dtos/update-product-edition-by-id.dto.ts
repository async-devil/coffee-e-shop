import { ApiProperty, OmitType, PickType } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsNumberString, IsOptional, IsString } from "class-validator";

export class UpdateProductEditionByIdDto {
	/** @example 1 */
	@IsNumberString()
	@ApiProperty({ example: 1 })
	public productId: number;

	/** @example 2 */
	@IsNumberString()
	@ApiProperty({ example: 2 })
	public id: number;

	/** @example "250g" */
	@IsString()
	@IsOptional()
	@ApiProperty({ required: false, example: "250g" })
	public name: string;

	/** @example 259 */
	@IsNumber()
	@IsOptional()
	@ApiProperty({ required: false, example: 259 })
	public price: number;

	/** @example true */
	@IsBoolean()
	@IsOptional()
	@ApiProperty({ required: false, example: true })
	public available: boolean;
}

export class UpdateProductEditionByIdBodyDto extends OmitType(UpdateProductEditionByIdDto, [
	"productId",
	"id",
]) {}

export class UpdateProductEditionByIdParametersDto extends PickType(UpdateProductEditionByIdDto, [
	"productId",
	"id",
]) {}
