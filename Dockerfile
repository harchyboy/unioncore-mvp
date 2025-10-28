# Dockerfile for UNION Core Plus MVP
# Production-ready build with Vite
FROM node:20-alpine AS builder
WORKDIR /app
# Copy package files
COPY package*.json ./
# Install ALL dependencies first (including dev deps needed for build)
# Using --legacy-peer-deps to handle vite 7 peer dependency conflicts
RUN npm install --legacy-peer-deps
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

# Copy everything from builder including node_modules
COPY --from=builder /app ./

# Expose port 5879
EXPOSE 5879

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5879', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Run the application using npm script to ensure vite.config.ts is read
CMD ["npm", "run", "dev"]
