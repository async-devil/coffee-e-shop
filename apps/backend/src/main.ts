import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import helmet from "helmet";

import { AppModule } from "./app.module";

async function bootstrap() {
	const port = process.env.PORT || 8000;

	const swaggerConfig = new DocumentBuilder()
		.setTitle("Nestjs template")
		.setVersion("1.0.0")
		.addBearerAuth()
		.build();

	const app = await NestFactory.create(AppModule);

	app.setGlobalPrefix("api");

	app.use(helmet());
	app.useGlobalPipes(new ValidationPipe());

	const document = SwaggerModule.createDocument(app, swaggerConfig);
	SwaggerModule.setup("/api/docs", app, document);

	await app.listen(port);
	Logger.log(`Gateway is started on http://localhost:${port}`, "NestApplication");
}

void bootstrap();
