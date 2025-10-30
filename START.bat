@echo off
REM UNION Core Plus - Simple Startup Script for Windows
REM This script makes it easy to run the application on Windows

echo =========================================
echo    UNION Core Plus - Starting Server   
echo =========================================
echo.

REM Check if node_modules exists, if not, install dependencies
if not exist "node_modules" (
    echo 📦 Installing dependencies (first time only)...
    call npm install
    echo.
)

REM Check if dist exists, if not, build the application
if not exist "dist\public" (
    echo 🔨 Building application (first time only)...
    call npm run build
    echo.
)

REM Start the server
echo 🚀 Starting server...
echo.
echo ✅ Application will be available at:
echo    http://localhost:5879
echo.
echo Press Ctrl+C to stop the server
echo.

call npm start
