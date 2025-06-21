# Contributing to GeoJSON to GeoBuf Converter

Thank you for your interest in contributing to the GeoJSON to GeoBuf Converter project! This document provides guidelines and information for contributors.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Enhancements](#suggesting-enhancements)
- [Code Style Guidelines](#code-style-guidelines)
- [Testing](#testing)
- [Documentation](#documentation)

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

- Use the GitHub issue tracker
- Include detailed steps to reproduce the bug
- Provide system information (OS, Node.js version, etc.)
- Include error messages and stack traces
- Attach sample files if relevant

### Suggesting Enhancements

- Use the GitHub issue tracker with the "enhancement" label
- Clearly describe the proposed feature
- Explain why this feature would be useful
- Provide examples of how it would work

### Pull Requests

- Fork the repository
- Create a feature branch from `develop`
- Make your changes
- Add tests for new functionality
- Ensure all tests pass
- Update documentation if needed
- Submit a pull request

## Development Setup

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/your-username/geojson-geobuf-converter.git
   cd geojson-geobuf-converter
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up pre-commit hooks**
   ```bash
   npm run prepare
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## Pull Request Process

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clean, well-documented code
   - Follow the existing code style
   - Add tests for new functionality
   - Update documentation if needed

3. **Run quality checks**
   ```bash
   npm run lint
   npm run format:check
   npm run test
   npm run security
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a pull request**
   - Target the `develop` branch
   - Provide a clear description of changes
   - Reference any related issues
   - Include screenshots for UI changes

## Code Style Guidelines

### JavaScript/Node.js

- Use ES6+ features
- Follow ESLint configuration
- Use meaningful variable and function names
- Add JSDoc comments for public APIs
- Keep functions small and focused

### Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for formatting changes
- `refactor:` for code refactoring
- `test:` for adding tests
- `chore:` for maintenance tasks

### File Naming

- Use kebab-case for file names
- Use descriptive names
- Group related files in directories

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Writing Tests

- Test all new functionality
- Use descriptive test names
- Test both success and error cases
- Mock external dependencies
- Keep tests simple and focused

### Test Structure

```javascript
describe('Feature Name', () => {
  describe('when condition', () => {
    it('should expected behavior', () => {
      // Test implementation
    });
  });
});
```

## Documentation

### Code Documentation

- Add JSDoc comments for all public functions
- Include parameter types and descriptions
- Document return values and exceptions
- Provide usage examples

### README Updates

- Update README.md for new features
- Include usage examples
- Update installation instructions if needed
- Add screenshots for UI changes

### API Documentation

- Document all API endpoints
- Include request/response examples
- Document error codes and messages
- Keep documentation up to date

## Getting Help

If you need help with contributing:

1. Check existing issues and pull requests
2. Read the project documentation
3. Ask questions in GitHub discussions
4. Contact the maintainers

## Recognition

Contributors will be recognized in:

- The project README
- Release notes
- GitHub contributors list

Thank you for contributing to the GeoJSON to GeoBuf Converter project! 