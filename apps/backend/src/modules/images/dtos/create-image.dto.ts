import { IsOptional, IsString } from "class-validator";

export class CreateImageDto {
	@IsOptional()
	@IsString()
	public name?: string;
}
