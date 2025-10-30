# UNION Core Plus - Portfolio & Marketing Management

A comprehensive dashboard for managing properties, leads, and broker relationships in commercial real estate.

## ✨ Features

- **Portfolio Management**: Track properties, occupancy rates, and revenue
- **Lead Pipeline**: Manage leads through qualification, matching, viewing, and proposal stages
- **Broker Network**: Monitor broker performance and commissions
- **Analytics Dashboard**: Real-time insights into portfolio and lead performance

## 🚀 Quick Start

### The Easiest Way to Run

#### On Windows:
Double-click `START.bat` or run:
```bash
START.bat
```

#### On Linux/Mac:
Run:
```bash
./START.sh
```

That's it! The script will:
1. Install dependencies if needed (first time only)
2. Build the application if needed (first time only)
3. Start the server

The application will be available at: **http://localhost:5879**

## 📋 Prerequisites

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)

## 🔧 Manual Setup (Alternative)

If you prefer to run commands manually:

### 1. Install Dependencies
```bash
npm install
```

### 2. Build the Application
```bash
npm run build
```

### 3. Start the Server
```bash
npm start
```

The application will be running at http://localhost:5879

## 🛠️ Development Mode

To run in development mode with hot-reloading:

```bash
npm run dev
```

This will start the development server at http://localhost:51666 (or another available port).

## 📂 Project Structure

```
unioncore-mvp/
├── client/              # Frontend React application
│   ├── src/
│   │   ├── pages/      # Page components
│   │   ├── components/ # Reusable UI components
│   │   └── main.tsx    # Application entry point
│   └── index.html      # HTML template
├── server/              # Backend Express server
│   └── index.ts        # Server configuration
├── dist/                # Built application (generated)
│   ├── public/         # Frontend build output
│   └── index.js        # Server build output
├── START.sh            # Easy startup script for Linux/Mac
├── START.bat           # Easy startup script for Windows
└── package.json        # Project dependencies
```

## 🎯 Available Scripts

| Command | Description |
|---------|-------------|
| `npm install` | Install all dependencies |
| `npm run dev` | Start development server with hot-reload |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run check` | Type-check the code |

## 🌐 Deployment

The application is production-ready and can be deployed to:
- Docker containers (Dockerfile included)
- Cloud platforms (Heroku, AWS, Azure, etc.)
- VPS servers
- Dokploy (see DOKPLOY_SETUP_NOW.md)

## 🐛 Troubleshooting

### Blank Screen Issue
**Fixed!** The application previously showed a blank screen due to a missing React plugin in the Vite configuration. This has been resolved.

### Port Already in Use
If port 5879 is already in use, you can change it by setting the PORT environment variable:

**Windows:**
```bash
set PORT=3000 && npm start
```

**Linux/Mac:**
```bash
PORT=3000 npm start
```

### Dependencies Not Installing
Make sure you have Node.js v18 or higher installed:
```bash
node --version
```

### Build Fails
Clear the cache and reinstall:
```bash
rm -rf node_modules dist
npm install
npm run build
```

## 📝 Configuration

### Environment Variables

You can customize the server behavior with environment variables:

- `PORT` - Server port (default: 5879)
- `NODE_ENV` - Environment mode (development/production)

## 🔒 Security

The application includes:
- CORS support for cross-origin requests
- Secure headers
- Production-optimized builds

## 📄 License

MIT

## 🤝 Support

For issues or questions, please check the existing documentation files or create an issue in the repository.

---

**Enjoy using UNION Core Plus! 🎉**
