# UnionCore MVP - Access Information

## Application Status
✅ Application is running and accessible via Traefik reverse proxy
✅ Publicly accessible via Cloudflare Tunnel

## Access URLs

### 🌐 Public Access (Cloudflare Tunnel)
**Your application is live at:**
## 🚀 https://parental-trustee-span-php.trycloudflare.com

This URL is accessible from anywhere in the world!

### Local Access (via Traefik)
- **Application**: http://localhost:50910
- **Traefik Dashboard**: http://localhost:50910/dashboard/

### Direct Access
- **Application (Direct)**: http://localhost:5879

## Services Running

1. **Vite Dev Server** (Port 5879)
   - Process: `pnpm dev`
   - Logs: `/workspace/unioncore-mvp/app.log`

2. **Traefik Reverse Proxy** (Port 50910)
   - Process: `traefik --configFile=traefik.yml`
   - Logs: `/workspace/unioncore-mvp/traefik.log`
   - Configuration:
     - Main config: `traefik.yml`
     - Dynamic config: `traefik-dynamic.yml`

3. **Cloudflare Tunnel** (Public Access)
   - Process: `cloudflared tunnel --url http://localhost:50910`
   - Logs: `/workspace/unioncore-mvp/cloudflared.log`
   - Public URL: https://parental-trustee-span-php.trycloudflare.com

## Configuration Details

### Traefik Setup
- **Entry Point**: Port 50910
- **Backend**: http://localhost:5879 (Vite Dev Server)
- **Dashboard**: Enabled at `/dashboard/`
- **CORS**: Enabled for iframe support

### Application Settings
- **Host**: 0.0.0.0 (accessible from any interface)
- **Port**: 5879
- **Framework**: React + TypeScript + Vite
- **Backend**: Express.js

## Managing Services

### Stop Services
```bash
# Stop Vite dev server
pkill -f "vite --host"

# Stop Traefik
pkill -f "traefik --configFile"

# Stop Cloudflare Tunnel
pkill -f "cloudflared tunnel"
```

### Start Services
```bash
# Start application
cd /workspace/unioncore-mvp
nohup pnpm dev > app.log 2>&1 &

# Start Traefik
cd /workspace/unioncore-mvp
nohup traefik --configFile=traefik.yml > traefik.log 2>&1 &

# Start Cloudflare Tunnel
cd /workspace/unioncore-mvp
nohup cloudflared tunnel --url http://localhost:50910 > cloudflared.log 2>&1 &
```

### View Logs
```bash
# Application logs
tail -f /workspace/unioncore-mvp/app.log

# Traefik logs
tail -f /workspace/unioncore-mvp/traefik.log

# Cloudflare Tunnel logs
tail -f /workspace/unioncore-mvp/cloudflared.log
```

## Network Configuration

The application is configured to accept connections from:
- localhost
- 0.0.0.0 (all interfaces)
- iframe embedding is enabled
- CORS is configured for cross-origin requests

## Environment

- **Node.js**: pnpm package manager
- **Development Mode**: HMR (Hot Module Replacement) enabled
- **Proxy**: Traefik v2.11.0

---

Last updated: 2025-10-22
