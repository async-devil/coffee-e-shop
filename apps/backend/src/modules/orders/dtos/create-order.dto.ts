import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
	IsArray,
	IsEmail,
	IsISO31661Alpha2,
	IsInt,
	IsNumber,
	IsPhoneNumber,
	IsPostalCode,
	IsString,
	Min,
	ValidateNested,
} from "class-validator";

import { IsISO639Alpha2 } from "src/common/iso639-alpha2.validator";

export class ContactInformationDto {
	/** @example "example@mail.com" */
	@IsEmail()
	@ApiProperty({ example: "example@mail.com" })
	public email: string;

	/** @example "+380631234567" */
	@IsPhoneNumber()
	@ApiProperty({ example: "+380631234567" })
	public phoneNumber: string;

	/** @example "John" */
	@IsString()
	@ApiProperty({ example: "John" })
	public firstName: string;

	/** @example "Doe" */
	@IsString()
	@ApiProperty({ example: "Doe" })
	public lastName: string;

	/** @example "Johnson" */
	@IsString()
	@ApiProperty({ example: "Johnson" })
	public middleName: string;
}

export class DeliveryInformationDto {
	/** ISO 3166-2 @example "ua" */
	@IsISO31661Alpha2()
	@ApiProperty({ description: "ISO 3166-2", example: "ua" })
	public country: string;

	/** @example "Lviv Oblast" */
	@IsString()
	@ApiProperty({ example: "Lviv Oblast" })
	public region: string;

	/** @example "Lviv" */
	@IsString()
	@ApiProperty({ example: "Lviv" })
	public city: string;

	/** @example "Nalyvaika St" */
	@IsString()
	@ApiProperty({ example: "Nalyvaika St" })
	public address: string;

	/** @example "79000" */
	@IsPostalCode("any")
	@ApiProperty({ example: "79000" })
	public zipCode: string;
}

export class OrderItemInformationDto {
	/** @example 1 */
	@IsNumber()
	@ApiProperty({ example: 1 })
	public productId: number;

	/** @example 1 */
	@IsNumber()
	@ApiProperty({ example: 1 })
	public productEditionId: number;

	/** @example 1 */
	@IsInt()
	@Min(1)
	@ApiProperty({ example: 1, minimum: 1 })
	public amount: number;
}

export class CreateOrderDto {
	/** ISO 639-1 @example "en" */
	@IsISO639Alpha2()
	@ApiProperty({ description: "ISO 639-1", example: "en" })
	public language: string;

	@ValidateNested()
	@Type(() => ContactInformationDto)
	@ApiProperty({ type: ContactInformationDto })
	public contact: ContactInformationDto;

	@ValidateNested()
	@Type(() => DeliveryInformationDto)
	@ApiProperty({ type: DeliveryInformationDto })
	public delivery: DeliveryInformationDto;

	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => OrderItemInformationDto)
	@ApiProperty({ type: [OrderItemInformationDto] })
	public orderItems: OrderItemInformationDto[];
}
