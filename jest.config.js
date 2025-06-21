module.exports = {
  testEnvironment: 'node',
  collectCoverageFrom: [
    'index.js',
    'test/**/*.js',
    '!test/**/*.test.js',
    '!**/node_modules/**',
    '!**/coverage/**',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  testMatch: [
    '**/test/**/*.test.js',
    '**/*.test.js',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/coverage/',
  ],
  setupFilesAfterEnv: ['<rootDir>/test/setup.js'],
  verbose: true,
  testTimeout: 10000,
}; 