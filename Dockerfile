# Dockerfile for UNION Core Plus MVP
# Production build with Express server
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies first (including dev deps needed for build)
# Using --legacy-peer-deps to handle vite 7 peer dependency conflicts
RUN npm install --legacy-peer-deps

# Copy configuration files
COPY vite.config.ts tsconfig.json tsconfig.node.json ./
COPY tailwind.config.js postcss.config.js ./
COPY ecosystem.config.cjs ./

# Copy application files
COPY client ./client
COPY server ./server
COPY shared ./shared

# Build the React application AND compile the server
RUN npm run build

# Production stage
FROM node:20-alpine
WORKDIR /app

# Copy package files and install ONLY production dependencies
COPY package*.json ./
RUN npm install --production --legacy-peer-deps

# Copy built files from builder
COPY --from=builder /app/dist ./dist

# Expose port 5879 (custom application port)
EXPOSE 5879

# Set production environment
ENV NODE_ENV=production
ENV PORT=5879
ENV HOST=0.0.0.0

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5879/ || exit 1

# Start the Express server with explicit environment variables
CMD ["sh", "-c", "PORT=5879 NODE_ENV=production node dist/server/index.js"]
