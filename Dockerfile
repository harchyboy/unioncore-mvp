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
COPY ecosystem.config.cjs ./
COPY .prettierrc .prettierignore ./

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

# Expose port 80
EXPOSE 80

# Set production environment
ENV NODE_ENV=production
ENV PORT=80

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:80/ || exit 1

# Start the Express server
CMD ["node", "dist/index.js"]
