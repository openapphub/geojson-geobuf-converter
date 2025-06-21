# Use Node.js 18 Alpine for minimal size
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only, ignore scripts to avoid husky issues
RUN npm ci --only=production --ignore-scripts

# Copy source code
COPY . .

# Create necessary directories
RUN mkdir -p uploads output

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })" || exit 1

# Start the application
CMD ["npm", "start"] 