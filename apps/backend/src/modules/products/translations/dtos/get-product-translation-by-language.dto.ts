import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString } from "class-validator";

import { IsISO639Alpha2 } from "src/common/iso639-alpha2.validator";

export class GetProductTranslationByLanguageDto {
	/** @example 1 */
	@IsNumberString()
	@ApiProperty({ example: 1 })
	public productId: number;

	/** ISO 639-1 @example "en" */
	@IsISO639Alpha2()
	@ApiProperty({ description: "ISO 639-1", example: "en" })
	public language: string;
}
