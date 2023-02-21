import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { TypeOrmModule } from "@nestjs/typeorm";

import { typeOrmConfigBase } from "./database/ormconfig";

@Module({
	imports: [
		ThrottlerModule.forRoot({
			ttl: 60,
			limit: 2,
		}),
		TypeOrmModule.forRoot(typeOrmConfigBase()),
	],
	controllers: [],
	providers: [
		{
			provide: APP_GUARD,
			useClass: ThrottlerGuard,
		},
	],
})
export class AppModule {}
