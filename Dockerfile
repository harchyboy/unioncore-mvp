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
# Build the React application for production
RUN npm run build

FROM node:20-alpine
WORKDIR /app

# Install serve or use a simple static server
RUN npm install -g serve

# Copy only the built files from builder
COPY --from=builder /app/dist/public ./public

# Expose port 80 (standard HTTP port)
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:80/ || exit 1

# Serve the static files
CMD ["serve", "-s", "public", "-l", "80"]
