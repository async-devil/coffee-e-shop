import { IsString, IsUrl } from "class-validator";

export class AddImageLinkDto {
	@IsString()
	public name: string;

	@IsUrl()
	public url: string;
}
