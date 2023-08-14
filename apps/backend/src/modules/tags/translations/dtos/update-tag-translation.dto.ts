import { ApiProperty, PickType } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

import { OperateTagTranslationDto } from "./operate-tag-translation.dto";

export class UpdateTagTranslationDto extends OperateTagTranslationDto {
	/** @example "light roast" */
	@IsString()
	@IsOptional()
	@ApiProperty({ required: false, example: "light roast" })
	public name?: string;
}

export class UpdateTagTranslationBodyDto extends PickType(UpdateTagTranslationDto, ["name"]) {}
