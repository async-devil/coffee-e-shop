import { ApiProperty, PickType } from "@nestjs/swagger";
import { IsString } from "class-validator";

import { OperateTagTranslationDto } from "./operate-tag-translation.dto";

export class CreateTagTranslationDto extends OperateTagTranslationDto {
	/** @example "light roast" */
	@IsString()
	@ApiProperty({ example: "light roast" })
	public name: string;
}

export class CreateTagTranslationBodyDto extends PickType(CreateTagTranslationDto, ["name"]) {}
