import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "./app.module";

export async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const swaggerConfig = new DocumentBuilder()
		.setTitle("Coffee E-Shop documentation")
		.setVersion("1.0.0")
		.addBearerAuth()
		.build();

	app.setGlobalPrefix("api/");

	const document = SwaggerModule.createDocument(app, swaggerConfig);
	SwaggerModule.setup("/api/docs", app, document);

	await app.init();

	return app.getHttpAdapter();
}
