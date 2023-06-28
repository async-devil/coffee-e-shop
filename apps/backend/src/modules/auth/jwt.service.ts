import { Injectable, UnauthorizedException } from "@nestjs/common";
import * as jose from "jose";

@Injectable()
export class JWTService {
	private readonly secretKey = process.env.ACCESS_TOKEN_SECRET;
	private readonly expiresInS = process.env.ACCESS_TOKEN_TTL;

	/** Get key acceptable for signing jwt */
	private getKey(): Buffer {
		return Buffer.from(Buffer.from(this.secretKey).toString("base64"));
	}

	public async signJwt(message: jose.JWTPayload): Promise<string> {
		return await new jose.SignJWT(message)
			.setProtectedHeader({ alg: "HS256" })
			.setExpirationTime(`${this.expiresInS}s`)
			.setIssuedAt()
			.sign(this.getKey());
	}

	public async getJwtData(jwt: string): Promise<jose.JWTVerifyResult> {
		try {
			return await jose.jwtVerify(jwt, this.getKey());
		} catch (err) {
			throw new UnauthorizedException("Invalid JWT token");
		}
	}

	public async isValidJwt(jwt: string): Promise<boolean> {
		try {
			const data = await this.getJwtData(jwt);

			return !!data;
		} catch (err) {
			return false;
		}
	}
}
