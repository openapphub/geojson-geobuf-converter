# Security Policy

## Supported Versions

Use this section to tell people about which versions of your project are currently being supported with security updates.

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take the security of GeoJSON to GeoBuf Converter seriously. If you believe you have found a security vulnerability, please report it to us as described below.

### Reporting Process

1. **DO NOT** create a public GitHub issue for the vulnerability.
2. Email your findings to [security@openapphub.com](mailto:security@openapphub.com).
3. Provide a detailed description of the vulnerability, including:
   - Type of issue (buffer overflow, SQL injection, cross-site scripting, etc.)
   - Full paths of source file(s) related to the vulnerability
   - The location of the affected source code (tag/branch/commit or direct URL)
   - Any special configuration required to reproduce the issue
   - Step-by-step instructions to reproduce the issue
   - Proof-of-concept or exploit code (if possible)
   - Impact of the issue, including how an attacker might exploit it

### What to Expect

- You will receive an acknowledgment within 48 hours
- We will investigate and provide updates on our progress
- Once the issue is confirmed, we will work on a fix
- We will coordinate the disclosure with you
- We will credit you in the security advisory (unless you prefer to remain anonymous)

### Responsible Disclosure

We ask that you:

- Give us reasonable time to respond to issues before any disclosure to the public or a third-party
- Make a good faith effort to avoid privacy violations, destruction of data, and interruption or degradation of our service
- Not exploit a security issue you discover for any reason
- Not violate any other applicable laws or regulations

### Security Best Practices

When using this project, please follow these security best practices:

1. **Keep dependencies updated**: Regularly update your dependencies to get the latest security patches
2. **Use HTTPS**: Always use HTTPS in production environments
3. **Validate inputs**: Always validate and sanitize user inputs
4. **Limit file uploads**: Configure appropriate file size limits and type restrictions
5. **Monitor logs**: Monitor application logs for suspicious activity
6. **Use environment variables**: Store sensitive configuration in environment variables
7. **Regular security audits**: Run `npm audit` regularly to check for known vulnerabilities

### Security Features

This project includes several security features:

- **Input validation**: All user inputs are validated and sanitized
- **File type restrictions**: Only allowed file types can be uploaded
- **File size limits**: Configurable file size limits to prevent abuse
- **Temporary file cleanup**: Uploaded files are automatically cleaned up
- **CORS protection**: Cross-origin requests are properly configured
- **Security headers**: HTTP security headers are implemented
- **Non-root Docker user**: Docker containers run as non-root user

### Known Security Considerations

- **File uploads**: The application accepts file uploads, which can be a security risk if not properly handled
- **Memory usage**: Large files can consume significant memory during processing
- **Temporary files**: Files are temporarily stored on disk during processing

### Security Updates

Security updates will be released as patch versions (e.g., 1.0.1, 1.0.2) and will be clearly marked in the release notes. We recommend updating to the latest version as soon as possible.

### Contact Information

For security-related questions or concerns:

- Email: [security@openapphub.com](mailto:security@openapphub.com)
- PGP Key: [security-pgp-key.asc](https://github.com/openapphub/geojson-geobuf-converter/raw/main/security-pgp-key.asc)

Thank you for helping keep GeoJSON to GeoBuf Converter secure! 