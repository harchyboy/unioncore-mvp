#!/bin/bash

# UNION Core Plus - Simple Startup Script
# This script makes it easy to run the application on Windows, Linux, or Mac

echo "========================================="
echo "   UNION Core Plus - Starting Server   "
echo "========================================="
echo ""

# Check if node_modules exists, if not, install dependencies
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies (first time only)..."
    npm install
    echo ""
fi

# Check if dist exists, if not, build the application
if [ ! -d "dist/public" ] || [ ! -f "dist/index.js" ]; then
    echo "🔨 Building application (first time only)..."
    npm run build
    echo ""
fi

# Start the server
echo "🚀 Starting server..."
echo ""
echo "✅ Application will be available at:"
echo "   http://localhost:5879"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npm start
