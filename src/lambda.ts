import { RequestListener } from "http";

import { NestFactory } from "@nestjs/core";
import serverlessExpress from "@vendia/serverless-express";
import { Handler, Context, Callback } from "aws-lambda";

import { AppModule } from "./app.module";

let cachedServer: Handler;

async function bootstrapServer(): Promise<Handler> {
	if (!cachedServer) {
		const app = await NestFactory.create(AppModule);
		await app.init();

		const expressApp = app.getHttpAdapter().getInstance() as RequestListener;
		cachedServer = serverlessExpress({ app: expressApp });
	}
	return cachedServer;
}

export const handler: Handler = async (event: any, context: Context, callback: Callback) => {
	cachedServer = await bootstrapServer();
	return cachedServer(event, context, callback);
};
