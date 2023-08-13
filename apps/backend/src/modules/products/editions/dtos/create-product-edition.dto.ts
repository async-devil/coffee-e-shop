import { ApiProperty, OmitType, PickType } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsNumberString, IsOptional, IsString } from "class-validator";

export class CreateProductEditionDto {
	/** @example 1 */
	@IsNumberString()
	@ApiProperty({ example: 1 })
	public productId: number;

	/** @example "250g" */
	@IsString()
	@ApiProperty({ example: "250g" })
	public name: string;

	/** @example 259 */
	@IsNumber()
	@ApiProperty({ example: 259 })
	public price: number;

	/** @example true */
	@IsBoolean()
	@IsOptional()
	@ApiProperty({ required: false, example: true, default: true })
	public available?: boolean;
}

export class CreateProductEditionBodyDto extends OmitType(CreateProductEditionDto, ["productId"]) {}

export class CreateProductEditionParamsDto extends PickType(CreateProductEditionDto, [
	"productId",
]) {}
