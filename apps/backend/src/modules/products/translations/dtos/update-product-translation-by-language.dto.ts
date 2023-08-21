import { ApiProperty, OmitType, PickType } from "@nestjs/swagger";
import { IsNumberString, IsOptional, IsString } from "class-validator";

import { IsISO639Alpha2 } from "src/common/iso639-alpha2.validator";

export class UpdateProductTranslationByLanguageDto {
	/** @example 1 */
	@IsNumberString()
	@ApiProperty({ example: 1 })
	public productId: number;

	/** ISO 639-1 @example "en" */
	@IsISO639Alpha2()
	@ApiProperty({ description: "ISO 639-1", example: "en" })
	public language: string;

	/** @example "coffee" */
	@IsString()
	@IsOptional()
	@ApiProperty({ required: false, example: "coffee" })
	public name?: string;

	/** @example "coffee-beans" */
	@IsString()
	@IsOptional()
	@ApiProperty({ required: false, example: "coffee-beans" })
	public description?: string;

	/** @example "coffee-beans" */
	@IsString()
	@IsOptional()
	@ApiProperty({ required: false, example: "coffee-beans" })
	public previewDescription?: string;

	/** @example "this is coffee" */
	@IsString()
	@IsOptional()
	@ApiProperty({ required: false, example: "this is coffee" })
	public text?: string;
}

export class UpdateProductTranslationByLanguageBodyDto extends OmitType(
	UpdateProductTranslationByLanguageDto,
	["productId", "language"]
) {}

export class UpdateProductTranslationByLanguageParametersDto extends PickType(
	UpdateProductTranslationByLanguageDto,
	["productId", "language"]
) {}
