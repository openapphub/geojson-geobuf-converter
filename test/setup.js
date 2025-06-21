// Test setup file
const fs = require('fs');
const path = require('path');

// Create test directories if they don't exist
const testDirs = ['uploads', 'output'];
testDirs.forEach(dir => {
  const dirPath = path.join(__dirname, '..', dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
});

// Global test timeout
jest.setTimeout(10000);

// Cleanup function to run after each test
afterEach(() => {
  // Clean up test files
  const testDirs = ['uploads', 'output'];
  testDirs.forEach(dir => {
    const dirPath = path.join(__dirname, '..', dir);
    if (fs.existsSync(dirPath)) {
      const files = fs.readdirSync(dirPath);
      files.forEach(file => {
        const filePath = path.join(dirPath, file);
        if (fs.statSync(filePath).isFile()) {
          fs.unlinkSync(filePath);
        }
      });
    }
  });
}); 