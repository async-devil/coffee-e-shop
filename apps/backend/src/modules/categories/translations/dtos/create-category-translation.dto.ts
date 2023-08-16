import { ApiProperty, PickType } from "@nestjs/swagger";
import { IsString } from "class-validator";

import { OperateCategoryTranslationDto } from "./operate-category-translation.dto";

export class CreateCategoryTranslationDto extends OperateCategoryTranslationDto {
	/** @example "Coffee for espresso" */
	@IsString()
	@ApiProperty({ example: "Coffee for espresso" })
	public name: string;

	/** @example "Text description" */
	@IsString()
	@ApiProperty({ example: "Text description" })
	public text: string;
}

export class CreateCategoryTranslationBodyDto extends PickType(CreateCategoryTranslationDto, [
	"name",
	"text",
]) {}
