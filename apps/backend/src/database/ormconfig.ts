import * as path from "path";

import { DataSource, DataSourceOptions } from "typeorm";

import config from "src/config/config";

export const typeOrmConfigBase = (): DataSourceOptions => {
	const { postgres } = config();

	return {
		type: "postgres",

		...postgres,

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
