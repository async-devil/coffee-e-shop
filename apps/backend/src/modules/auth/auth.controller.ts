import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { AuthService } from "./auth.service";
import { LoginDto } from "./dtos/login.dto";

@ApiTags("auth")
@Controller("admin/auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post("/login")
	public async login(@Body() dto: LoginDto) {
		return await this.authService.login(dto.password);
	}
}
