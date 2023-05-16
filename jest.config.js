/** @type {import('jest').Config} */
module.exports = {
  bail: true,
  testEnvironment: "node",
  testTimeout: 60_000,
  transform: {
    "^.+\\.ts$": "@swc/jest"
  },
  moduleFileExtensions: ["ts", "js", "json"],
  testMatch: ["**/*.test.ts"]
};
