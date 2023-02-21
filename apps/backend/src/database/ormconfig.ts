import * as path from "path";

import { DataSource, DataSourceOptions } from "typeorm";

export const typeOrmConfigBase = (): DataSourceOptions => {
	return {
		type: "postgres",

		host: process.env.POSTGRES_HOST || "127.0.0.1",
		port: parseInt(process.env.POSTGRES_PORT) || 5432,
		username: process.env.POSTGRES_USERNAME || "root",
		password: process.env.POSTGRES_PASSWORD || "toor",
		database: process.env.POSTGRES_DATABASE || "coffee-e-shop",

		migrationsRun: false,
		dropSchema: false,

		entities: [
			path.join(__dirname, "..", "entities", "**", "*.*"),
			path.join(__dirname, "..", "entities", "*.*"),
		],
		migrations: [path.join(__dirname, "migrations", "*.*")],
	};
};

export default new DataSource(
	Object.assign(typeOrmConfigBase(), {
		cli: {
			entitiesDir: path.join(__dirname, "..", "entities"),
			migrationsDir: path.join(__dirname, "migrations"),
		},
	})
);
