import { Module } from "@nestjs/common";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JWTService } from "./jwt.service";

@Module({
	imports: [],
	controllers: [AuthController],
	providers: [JWTService, AuthService],
	exports: [JWTService],
})
export class AuthModule {}
