# 🚀 UNION Core Plus - Quick Start Guide

## Running the Application (Super Easy!)

### Windows Users:

1. **Double-click** `START.bat`
   - OR open Command Prompt and type: `START.bat`

### Linux/Mac Users:

1. Open Terminal in this folder
2. Type: `./START.sh`

### That's It!

- The app will automatically install dependencies (first time only)
- The app will automatically build (first time only)
- Your browser should open to: **http://localhost:5879**

---

## First Time Setup

### Before You Start:

Make sure you have **Node.js** installed:

- Download from: https://nodejs.org/
- Version 18 or higher required
- Check your version: `node --version`

---

## Stopping the Server

Press `Ctrl + C` in the terminal/command prompt window

---

## Common Issues & Solutions

### ❌ "Blank Screen" or "Nothing Shows Up"

**FIXED!** This issue has been resolved. If you still see it:

1. Stop the server (Ctrl+C)
2. Delete the `dist` folder
3. Run `npm run build`
4. Run `npm start`

### ❌ "Port Already in Use"

Another program is using port 5879. Either:

- Close that program, OR
- Change the port:
  - **Windows**: `set PORT=3000 && npm start`
  - **Linux/Mac**: `PORT=3000 npm start`

### ❌ "Command Not Found" or "npm Not Recognized"

Node.js is not installed or not in PATH:

1. Install Node.js from https://nodejs.org/
2. Restart your terminal/command prompt
3. Try again

### ❌ Build Fails or Errors During Install

Clean everything and start fresh:

```bash
# Delete old files
rm -rf node_modules dist

# Reinstall and rebuild
npm install
npm run build
npm start
```

---

## Manual Commands (If Scripts Don't Work)

### 1. Install Dependencies

```bash
npm install
```

### 2. Build the Application

```bash
npm run build
```

### 3. Start Server

```bash
npm start
```

---

## Development Mode (For Developers)

Want to make changes and see them live?

```bash
npm run dev
```

This starts a development server with hot-reload at http://localhost:51666

---

## Need More Help?

- Check `README.md` for detailed documentation
- Check `DEPLOYMENT.md` for deployment instructions
- Look at other `.md` files for specific topics

---

## System Requirements

- **Node.js**: v18 or higher
- **RAM**: 2GB minimum
- **Disk Space**: 500MB for dependencies
- **OS**: Windows 10+, Linux, or macOS

---

**Made Simple. Made to Work. 🎯**
