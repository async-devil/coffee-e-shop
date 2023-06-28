import { Body, Controller, Post } from "@nestjs/common";

import { AuthService } from "./auth.service";
import { LoginDto } from "./dtos/login.dto";

@Controller("admin/auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post("/login")
	public async login(@Body() dto: LoginDto) {
		return await this.authService.login(dto.password);
	}
}
