module.exports = {
	moduleFileExtensions: ["js", "json", "ts"],
	moduleNameMapper: {
		"^src/(.*)$": "<rootDir>/src/$1",
		"^test/(.*)$": "<rootDir>/test/$1",
	},
	rootDir: "./",
	roots: ["<rootDir>/test"],
	testRegex: ".*\\.spec\\.ts$",
	transform: {
		"^.+\\.(t|j)s$": "ts-jest",
	},

	collectCoverageFrom: ["src/**/*.(t|j)s"],
	coverageDirectory: "./coverage",
	testEnvironment: "node",
	preset: "ts-jest",
};
