import { NestFactory } from "@nestjs/core";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import fastify, { FastifyInstance, FastifyServerOptions } from "fastify";

import { AppModule } from "./app.module";

export async function bootstrap() {
	const serverOptions: FastifyServerOptions = {};
	const instance: FastifyInstance = fastify(serverOptions);

	const app = await NestFactory.create<NestFastifyApplication>(
		AppModule,
		new FastifyAdapter(instance)
	);

	const swaggerConfig = new DocumentBuilder()
		.setTitle("Coffee E-Shop documentation")
		.setVersion("1.0.0")
		.addBearerAuth()
		.build();

	app.setGlobalPrefix("api/");

	const document = SwaggerModule.createDocument(app, swaggerConfig);
	SwaggerModule.setup("/api/docs", app, document);

	await app.init();
	return instance;
}

void bootstrap();
