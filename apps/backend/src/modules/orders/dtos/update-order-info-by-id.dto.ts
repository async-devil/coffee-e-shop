import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsNumber, IsOptional, ValidateNested } from "class-validator";

import { OrderState } from "src/entities/order.entity";

import { ContactInformationDto, DeliveryInformationDto } from "./create-order.dto";

export class UpdateContactInformationDto extends PartialType(ContactInformationDto) {}

export class UpdateDeliveryInformationDto extends PartialType(DeliveryInformationDto) {}

export class UpdateOrderByIdDto {
	/** @example 1 */
	@IsNumber()
	@ApiProperty({ example: 1 })
	public id: number;

	/** @example "processed" */
	@IsOptional()
	@IsEnum(OrderState)
	@ApiProperty({ type: OrderState, enum: OrderState, required: false, example: "processed" })
	public state?: OrderState;

	@IsOptional()
	@ValidateNested()
	@Type(() => UpdateContactInformationDto)
	@ApiProperty({ type: UpdateContactInformationDto, required: false })
	public contact?: UpdateContactInformationDto;

	@IsOptional()
	@ValidateNested()
	@Type(() => UpdateDeliveryInformationDto)
	@ApiProperty({ type: UpdateDeliveryInformationDto, required: false })
	public delivery?: UpdateDeliveryInformationDto;
}

export class UpdateOrderByIdBodyDto extends OmitType(UpdateOrderByIdDto, ["id"]) {}
