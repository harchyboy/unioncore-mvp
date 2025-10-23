# Dockerfile for UNION Core Plus MVP
# Production-ready build with Vite

FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
# Note: Using npm install instead of npm ci because package-lock.json is not in the repo
RUN npm install --production

# Copy configuration files
COPY vite.config.ts tsconfig.json tsconfig.node.json ./
COPY ecosystem.config.cjs ./
COPY .prettierrc .prettierignore ./

# Copy application files
COPY client ./client

# Build the application (if needed in future)
# RUN npm run build

FROM node:20-alpine

WORKDIR /app

# Install vite globally
RUN npm install -g vite@latest

# Copy application from builder
COPY --from=builder /app ./

# Expose port 5879
EXPOSE 5879

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5879', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Run the application
CMD ["vite", "--host", "0.0.0.0", "--port", "5879", "client"]
