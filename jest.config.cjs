module.exports = {
	testEnvironment: "jest-environment-jsdom",
	transform: {
		"^.+\\.[t|j]sx?$": "babel-jest",
	},
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/src/$1",
	},
	setupFilesAfterEnv: ["<rootDir>/src/jest-setup.ts"], // if you have setup file,
	testPathIgnorePatterns: ["/node_modules/", "/dist/"],
};
