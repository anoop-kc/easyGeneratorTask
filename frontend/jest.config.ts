// import { pathsToModuleNameMapper } from "ts-jest/utils";
import { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  coverageDirectory: "coverage",
  coverageReporters: ["html", "text"],
  reporters: [
    "default",
    [
      "jest-html-reporters",
      {
        publicPath: "reports",
        filename: "test-report.html",
        expand: true,
      },
    ],
  ],
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
};

export default config;
