module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src"],
  testMatch: ["**/__tests__/**/*.ts", "**/?(*.)+(spec|test).ts"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/**/*.d.ts",
    "!src/**/*.interface.ts",
    "!src/types/**",
    "!src/**/*.test.ts",
    "!src/**/*.spec.ts",
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov", "html"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@/types/(.*)$": "<rootDir>/src/types/$1",
    "^@/config/(.*)$": "<rootDir>/src/config/$1",
    "^@/middleware/(.*)$": "<rootDir>/src/middleware/$1",
    "^@/modules/(.*)$": "<rootDir>/src/modules/$1",
    "^@/utils/(.*)$": "<rootDir>/src/utils/$1",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  setupFilesAfterEnv: ["<rootDir>/src/tests/setup.ts"],
  testTimeout: 10000,
  verbose: true,
  globals: {
    "ts-jest": {
      tsconfig: {
        esModuleInterop: true,
      },
    },
  },
};
