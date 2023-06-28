/* eslint-disable import/no-extraneous-dependencies */
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";

import { JWTService } from "src/modules/auth/jwt.service";

@Injectable()
export class AccessTokenGuard implements CanActivate {
	constructor(private readonly jwtService: JWTService) {}

	public async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest<Request>();
		const headers = request.headers;

		const authorizationHeader = headers.authorization;
		if (!authorizationHeader) throw new UnauthorizedException("No authorization header provided");

		const accessToken = authorizationHeader.replace("Bearer ", "");
		const validationResult = await this.jwtService.isValidJwt(accessToken);
		if (!validationResult) throw new UnauthorizedException("Invalid access token");

		return true;
	}
}
