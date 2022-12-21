import { Logger } from "@nestjs/common";
import { FastifyListenOptions } from "fastify";

import { bootstrap } from "./server";

async function startLocally() {
	const instance = await bootstrap();

	const options: FastifyListenOptions = {
		port: 8080,
		host: "0.0.0.0",
	};

	await instance.listen(options);
	Logger.log(`Gateway is started on http://localhost:8080`, "NestApplication");
}

void startLocally();
