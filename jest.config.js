module.exports = {
  "testEnvironment": "node",
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
  "coveragePathIgnorePatterns": [
    "/node_modules/",
    "/coverage/",
    "/dist/",
    "/typings/",
    "/tests/",
    "/utils/version-compare.ts"
  ],
  "coverageThreshold": {
    "global": {
      "branches": 90,
      "functions": 100,
      "lines": 100,
      "statements": -10
    }
  },
  "testMatch": [
    "**/?(*.)(test).(tsx|ts)"
  ],
  "collectCoverageFrom": [
    "src/**/*.(tsx|ts)"
  ]
};
