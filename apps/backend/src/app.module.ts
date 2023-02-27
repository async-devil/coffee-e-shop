import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";

import { ImagesModule } from "./modules/images/images.module";

@Module({
	imports: [
		ThrottlerModule.forRoot({
			ttl: 60,
			limit: 100,
		}),
		ImagesModule,
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
