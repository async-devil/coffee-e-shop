import { ApiProperty, PickType } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

import { OperateCategoryTranslationDto } from "./operate-category-translation.dto";

export class UpdateCategoryTranslationDto extends OperateCategoryTranslationDto {
	/** @example "Coffee for espresso" */
	@IsString()
	@IsOptional()
	@ApiProperty({ required: false, example: "Coffee for espresso" })
	public name?: string;

	/** @example "Text description" */
	@IsString()
	@IsOptional()
	@ApiProperty({ required: false, example: "Text description" })
	public text?: string;
}

export class UpdateCategoryTranslationBodyDto extends PickType(UpdateCategoryTranslationDto, [
	"name",
	"text",
]) {}
