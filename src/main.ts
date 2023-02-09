import { Logger } from "@nestjs/common";

import { bootstrap } from "./server";

async function startLocally() {
	const instance = await bootstrap();

	await instance.listen(8080);
	Logger.log(`Gateway is started on http://localhost:8080`, "NestApplication");
}

void startLocally();
