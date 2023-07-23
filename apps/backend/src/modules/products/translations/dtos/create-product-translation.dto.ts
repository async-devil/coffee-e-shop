import { ApiProperty, OmitType, PickType } from "@nestjs/swagger";
import { IsNumberString, IsString } from "class-validator";

import { IsISO639Alpha2 } from "src/common/ISO639-alpha2.validator";

export class CreateProductTranslationDto {
	/** @example 1 */
	@IsNumberString()
	@ApiProperty({ example: 1 })
	public product_id: number;

	/** ISO 639-1 @example "en" */
	@IsISO639Alpha2()
	@ApiProperty({ description: "ISO 639-1", example: "en" })
	public language: string;

	/** @example "coffee" */
	@IsString()
	@ApiProperty({ example: "coffee" })
	public name: string;

	/** @example "coffee-beans" */
	@IsString()
	@ApiProperty({ example: "coffee-beans" })
	public description: string;

	/** @example "coffee-beans" */
	@IsString()
	@ApiProperty({ example: "coffee-beans" })
	public preview_description: string;

	/** @example "this is coffee" */
	@IsString()
	@ApiProperty({ example: "this is coffee" })
	public text: string;
}

export class CreateProductTranslationBodyDto extends OmitType(CreateProductTranslationDto, [
	"product_id",
	"language",
]) {}

export class CreateProductTranslationParamsDto extends PickType(CreateProductTranslationDto, [
	"product_id",
	"language",
]) {}
