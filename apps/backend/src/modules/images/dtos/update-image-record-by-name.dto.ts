import { ApiProperty, OmitType } from "@nestjs/swagger";
import { IsString } from "class-validator";

import { OperateImageRecordByNameDto } from "./operate-image-record-by-name.dto";

export class UpdateImageRecordByName extends OperateImageRecordByNameDto {
	/** @example "ethiopia-beans-1" */
	@IsString()
	@ApiProperty({ example: "ethiopia-beans-1" })
	public updated_name: string;
}

export class UpdateImageRecordByNameBodyDto extends OmitType(UpdateImageRecordByName, ["name"]) {}
