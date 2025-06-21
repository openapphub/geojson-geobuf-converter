# Docker Deployment Guide

This guide explains how to deploy the GeoJSON to GeoBuf Converter using Docker and how to set up automated Docker image publishing.

## Quick Start

### Using Docker Hub

```bash
# Pull the latest image
docker pull openapphub/geojson-geobuf-converter:latest

# Run the container
docker run -d -p 3000:3000 --name geojson-converter openapphub/geojson-geobuf-converter:latest
```

### Using GitHub Container Registry

```bash
# Pull from GitHub Container Registry
docker pull ghcr.io/openapphub/geojson-geobuf-converter:latest

# Run the container
docker run -d -p 3000:3000 --name geojson-converter ghcr.io/openapphub/geojson-geobuf-converter:latest
```

## Docker Compose

Create a `docker-compose.yml` file:

```yaml
version: '3.8'
services:
  geojson-converter:
    image: openapphub/geojson-geobuf-converter:latest
    container_name: geojson-converter
    ports:
      - "3000:3000"
    volumes:
      - ./uploads:/app/uploads
      - ./output:/app/output
    restart: unless-stopped
    environment:
      - NODE_ENV=production
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
```

Run with:
```bash
docker-compose up -d
```

## Building Locally

```bash
# Clone the repository
git clone https://github.com/openapphub/geojson-geobuf-converter.git
cd geojson-geobuf-converter

# Build the image
docker build -t geojson-converter .

# Run the container
docker run -d -p 3000:3000 --name geojson-converter geojson-converter
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3000` | Server port |
| `NODE_ENV` | `production` | Environment mode |

## Volume Mounts

- `/app/uploads`: Temporary upload directory
- `/app/output`: Output files directory

## Health Check

The container includes a health check that verifies the application is running:

```bash
# Check container health
docker ps
```

## Security Considerations

- The container runs as a non-root user (nodejs:nodejs)
- Multi-stage build reduces image size
- Alpine Linux base for minimal attack surface
- Health checks ensure application availability

## Automated Docker Publishing

### GitHub Actions Setup

The project includes automated Docker image publishing to both GitHub Container Registry and Docker Hub.

#### GitHub Container Registry (Automatic)

Images are automatically published to `ghcr.io/openapphub/geojson-geobuf-converter` on every push to main branch.

#### Docker Hub Setup

To enable Docker Hub publishing, add these secrets to your GitHub repository:

1. Go to your repository settings
2. Navigate to Secrets and variables → Actions
3. Add the following secrets:
   - `DOCKERHUB_USERNAME`: Your Docker Hub username
   - `DOCKERHUB_TOKEN`: Your Docker Hub access token

#### Creating Docker Hub Access Token

1. Log in to [Docker Hub](https://hub.docker.com)
2. Go to Account Settings → Security
3. Click "New Access Token"
4. Give it a name (e.g., "GitHub Actions")
5. Copy the token and add it to GitHub secrets

### Manual Publishing

If you want to publish manually:

```bash
# Login to Docker Hub
docker login

# Build and tag
docker build -t openapphub/geojson-geobuf-converter:latest .
docker tag openapphub/geojson-geobuf-converter:latest openapphub/geojson-geobuf-converter:v1.0.0

# Push to Docker Hub
docker push openapphub/geojson-geobuf-converter:latest
docker push openapphub/geojson-geobuf-converter:v1.0.0
```

## Multi-Architecture Builds

The GitHub Actions workflow builds multi-architecture images for:
- linux/amd64
- linux/arm64

This ensures compatibility with different platforms including ARM-based servers.

## Troubleshooting

### Container Won't Start

```bash
# Check container logs
docker logs geojson-converter

# Check if port is already in use
netstat -tulpn | grep :3000
```

### Permission Issues

```bash
# Fix volume permissions
sudo chown -R 1001:1001 ./uploads ./output
```

### Health Check Failing

```bash
# Check application logs
docker logs geojson-converter

# Test health endpoint manually
curl http://localhost:3000/api/health
```

## Production Deployment

For production deployment, consider:

1. **Reverse Proxy**: Use nginx or Traefik
2. **SSL/TLS**: Configure HTTPS
3. **Monitoring**: Add Prometheus metrics
4. **Logging**: Configure log aggregation
5. **Backup**: Set up volume backups
6. **Scaling**: Use Docker Swarm or Kubernetes

### Example with Nginx

```yaml
version: '3.8'
services:
  geojson-converter:
    image: openapphub/geojson-geobuf-converter:latest
    container_name: geojson-converter
    expose:
      - "3000"
    volumes:
      - ./uploads:/app/uploads
      - ./output:/app/output
    restart: unless-stopped
    networks:
      - app-network

  nginx:
    image: nginx:alpine
    container_name: nginx-proxy
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - geojson-converter
    networks:
      - app-network

networks:
  app-network:
    driver: bridge
```

## Support

For Docker-related issues:
- Check the [GitHub Issues](https://github.com/openapphub/geojson-geobuf-converter/issues)
- Review the [Docker documentation](https://docs.docker.com/)
- Contact the maintainers 