module.exports = {
  transform: {
    // '^.+\\.feature$': 'jest-cucumber',
    "^.+\\.[tj]sx?$": "babel-jest",
  },
  testEnvironment: "jsdom",
  // setupFilesAfterEnv: ['./jest.setup.js'],
  testMatch: [
    "**/tests/**/*.[jt]s?(x)",
    "**/tests/features/**/*.feature", // Feature files
    "**/tests/steps/**/*.steps.js", // Step definitions
  ],
  reporters: [
    "default",
    [
      "./node_modules/jest-html-reporter",
      {
        pageTitle: "Test Report",
      },
    ],
  ],
};
