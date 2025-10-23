#!/bin/bash

# UNION Core Plus - Startup Script
# This script starts the application and nginx reverse proxy
# Author: OpenHands AI
# Date: 2025-10-22

set -e

echo "🚀 Starting UNION Core Plus MVP..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Create log directory if it doesn't exist
mkdir -p /var/log/unioncore
chmod 755 /var/log/unioncore

# Stop any existing instances
echo -e "${YELLOW}Stopping existing instances...${NC}"
pm2 stop unioncore-mvp 2>/dev/null || true
pkill -f "nginx: master" 2>/dev/null || true
sleep 2

# Start PM2 application
echo -e "${BLUE}Starting UNION Core Plus application with PM2...${NC}"
cd /workspace/unioncore-mvp
pm2 start ecosystem.config.cjs
pm2 save

# Wait for application to be ready
echo -e "${BLUE}Waiting for application to start...${NC}"
sleep 5

# Check if application is running
if curl -s http://localhost:5879 > /dev/null; then
    echo -e "${GREEN}✅ Application is running on port 5879${NC}"
else
    echo -e "${YELLOW}⚠️  Application may not be ready yet, but PM2 will auto-restart${NC}"
fi

# Start nginx
echo -e "${BLUE}Starting nginx reverse proxy...${NC}"
nginx

# Wait for nginx to start
sleep 2

# Check nginx status
if curl -s http://localhost > /dev/null; then
    echo -e "${GREEN}✅ Nginx is running on port 80${NC}"
else
    echo -e "${YELLOW}⚠️  Nginx may not be ready yet${NC}"
fi

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}✅ UNION Core Plus MVP is running!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${BLUE}📊 Service Status:${NC}"
pm2 status
echo ""
echo -e "${BLUE}🌐 Access URLs:${NC}"
echo -e "   Local:      http://localhost"
echo -e "   Domain:     http://union.hartz.ai"
echo -e "   Direct:     http://localhost:5879"
echo ""
echo -e "${BLUE}📝 Useful Commands:${NC}"
echo -e "   View logs:     pm2 logs unioncore-mvp"
echo -e "   Restart app:   pm2 restart unioncore-mvp"
echo -e "   Stop app:      pm2 stop unioncore-mvp"
echo -e "   App status:    pm2 status"
echo -e "   Nginx reload:  nginx -s reload"
echo -e "   Nginx stop:    nginx -s stop"
echo ""
echo -e "${GREEN}✨ Application is ready to use!${NC}"
