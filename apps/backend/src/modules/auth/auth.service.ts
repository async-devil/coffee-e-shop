import { Injectable, UnauthorizedException } from "@nestjs/common";

import { JWTService } from "./jwt.service";

@Injectable()
export class AuthService {
	private readonly adminPassword = process.env.ADMIN_PASSWORD;

	constructor(private readonly jwtService: JWTService) {}

	private isValidPassword(password: string) {
		return password === this.adminPassword;
	}

	public async login(password: string) {
		if (!this.isValidPassword(password)) throw new UnauthorizedException("Invalid credentials");

		return await this.jwtService.signJwt({});
	}
}
