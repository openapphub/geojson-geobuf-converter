#!/bin/bash

# GeoJSON to GeoBuf Converter Deployment Script
# Made with ❤️ by OpenAppHub

set -e

echo "🚀 Starting GeoJSON to GeoBuf Converter deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Create necessary directories
print_status "Creating necessary directories..."
mkdir -p uploads output

# Set proper permissions
print_status "Setting proper permissions..."
chmod 755 uploads output

# Stop existing containers if running
print_status "Stopping existing containers..."
docker-compose down 2>/dev/null || true

# Build and start the application
print_status "Building and starting the application..."
docker-compose up -d --build

# Wait for the application to start
print_status "Waiting for the application to start..."
sleep 10

# Check if the application is running
if curl -f http://localhost:3000 > /dev/null 2>&1; then
    print_success "Application is running successfully!"
    echo ""
    echo "🌐 Access the application at: http://localhost:3000"
    echo "📁 Upload directory: ./uploads"
    echo "📁 Output directory: ./output"
    echo ""
    echo "📋 Useful commands:"
    echo "  - View logs: docker-compose logs -f"
    echo "  - Stop application: docker-compose down"
    echo "  - Restart application: docker-compose restart"
    echo "  - Update application: ./deploy.sh"
    echo ""
    print_success "Deployment completed successfully! 🎉"
else
    print_error "Application failed to start. Check the logs with: docker-compose logs"
    exit 1
fi 