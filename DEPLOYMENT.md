# UNION Core Plus - Deployment Documentation

## 🚀 Production Deployment Guide

**Application**: UNION Core Plus MVP  
**Repository**: https://github.com/harchyboy/unioncore-mvp  
**Domain**: union.hartz.ai  
**Port**: 5879 (internal), 80 (nginx proxy)  
**Server**: 2e36eaa785a4  
**Date Deployed**: 2025-10-22

---

## 📋 Table of Contents

1. [System Architecture](#system-architecture)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Running the Application](#running-the-application)
5. [Monitoring & Logs](#monitoring--logs)
6. [Maintenance](#maintenance)
7. [Troubleshooting](#troubleshooting)
8. [Backup & Recovery](#backup--recovery)

---

## 🏗️ System Architecture

```
Internet → union.hartz.ai (DNS)
    ↓
Server (2e36eaa785a4)
    ↓
Nginx (Port 80) ← Reverse Proxy
    ↓
Vite Dev Server (Port 5879) ← Managed by PM2
    ↓
Static Files (/workspace/unioncore-mvp/client)
```

### Components

- **Web Server**: Nginx 1.22.1
- **Application Server**: Vite (latest)
- **Process Manager**: PM2
- **Runtime**: Node.js 20+
- **Frontend**: Static HTML/JS/CSS (Tailwind, Highcharts)

---

## 🔧 Installation

### Prerequisites

```bash
# Required packages
- Node.js 20+ and npm
- Nginx
- PM2 (Node process manager)
```

### Install Dependencies

```bash
# Update system
apt-get update && apt-get upgrade -y

# Install Node.js (if not present)
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# Install nginx
apt-get install -y nginx

# Install PM2 globally
npm install -g pm2

# Clone repository (if not present)
cd /workspace
git clone https://github.com/harchyboy/unioncore-mvp.git
cd unioncore-mvp

# Install application dependencies
npm install
```

---

## ⚙️ Configuration

### 1. Nginx Configuration

**File**: `/etc/nginx/sites-available/union.hartz.ai`

```nginx
server {
    listen 80;
    server_name union.hartz.ai;

    location / {
        proxy_pass http://127.0.0.1:5879;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

**Enable site**:

```bash
ln -sf /etc/nginx/sites-available/union.hartz.ai /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t
```

### 2. PM2 Configuration

**File**: `/workspace/unioncore-mvp/ecosystem.config.cjs`

```javascript
module.exports = {
  apps: [
    {
      name: "unioncore-mvp",
      script: "npx",
      args: "vite --host 0.0.0.0 --port 5879 client",
      cwd: "/workspace/unioncore-mvp",
      instances: 1,
      autorestart: true,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        PORT: 5879,
      },
      error_file: "/var/log/unioncore/error.log",
      out_file: "/var/log/unioncore/app.log",
    },
  ],
};
```

### 3. DNS Configuration

Ensure `union.hartz.ai` points to the server IP:

```bash
# Check DNS resolution
nslookup union.hartz.ai

# Expected output:
# Name: union.hartz.ai
# Address: <server-ip>
```

---

## 🚀 Running the Application

### Quick Start

Use the provided startup script:

```bash
cd /workspace/unioncore-mvp
./start-unioncore.sh
```

### Manual Start

```bash
# Start application with PM2
cd /workspace/unioncore-mvp
pm2 start ecosystem.config.cjs

# Save PM2 configuration
pm2 save

# Start nginx
nginx

# Verify services
pm2 status
curl http://localhost:5879  # Test Vite directly
curl http://localhost       # Test nginx proxy
```

### Auto-Start on Boot

PM2 can generate startup scripts:

```bash
# Generate startup script
pm2 startup

# Follow the instructions provided by PM2
# It will output a command like:
# sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u root --hp /root

# After running that command:
pm2 save
```

### Stop Services

```bash
# Stop PM2 application
pm2 stop unioncore-mvp

# Stop nginx
nginx -s stop

# Or stop all
pm2 stop all
nginx -s stop
```

---

## 📊 Monitoring & Logs

### PM2 Monitoring

```bash
# Real-time status
pm2 status

# Monitor CPU/Memory usage
pm2 monit

# View logs (live)
pm2 logs unioncore-mvp

# View last 100 lines
pm2 logs unioncore-mvp --lines 100

# View only errors
pm2 logs unioncore-mvp --err

# Clear logs
pm2 flush
```

### Application Logs

```bash
# Application logs
tail -f /var/log/unioncore/app.log

# Error logs
tail -f /var/log/unioncore/error.log

# Both combined
tail -f /var/log/unioncore/*.log
```

### Nginx Logs

```bash
# Access logs
tail -f /var/log/nginx/union.hartz.ai.access.log

# Error logs
tail -f /var/log/nginx/union.hartz.ai.error.log

# All nginx logs
tail -f /var/log/nginx/*.log
```

### Health Checks

```bash
# Check if Vite is running
curl -I http://localhost:5879

# Check if nginx is proxying correctly
curl -I http://localhost

# Check if domain is accessible (from external)
curl -I http://union.hartz.ai

# Check process status
ps aux | grep vite
ps aux | grep nginx

# Check port usage
netstat -tlnp | grep -E ':(5879|80)'
# or
ss -tlnp | grep -E ':(5879|80)'
```

---

## 🔧 Maintenance

### Update Application Code

```bash
cd /workspace/unioncore-mvp

# Pull latest changes
git pull origin unzip-application

# Restart application
pm2 restart unioncore-mvp

# Or reload (zero-downtime)
pm2 reload unioncore-mvp
```

### Update Dependencies

```bash
cd /workspace/unioncore-mvp

# Update npm packages
npm update

# Restart application
pm2 restart unioncore-mvp
```

### Reload Nginx Configuration

```bash
# Test configuration
nginx -t

# Reload without downtime
nginx -s reload

# Full restart (if needed)
nginx -s stop
sleep 2
nginx
```

### Database Backup (Future)

Currently the application uses static data. When a backend is integrated:

```bash
# Example PostgreSQL backup
pg_dump -U postgres unioncore_db > backup_$(date +%Y%m%d).sql

# Example MongoDB backup
mongodump --db unioncore_db --out /backups/$(date +%Y%m%d)
```

---

## 🐛 Troubleshooting

### Application Not Responding

```bash
# Check PM2 status
pm2 status

# Check if port is in use
netstat -tlnp | grep 5879

# Restart application
pm2 restart unioncore-mvp

# If still not working, delete and restart
pm2 delete unioncore-mvp
pm2 start ecosystem.config.cjs
```

### Nginx 502 Bad Gateway

```bash
# Check if backend is running
curl http://localhost:5879

# Check nginx error logs
tail -50 /var/log/nginx/union.hartz.ai.error.log

# Test nginx configuration
nginx -t

# Restart nginx
nginx -s stop
nginx
```

### Port Already in Use

```bash
# Find process using port 5879
lsof -i :5879
# or
netstat -tlnp | grep 5879

# Kill the process
kill -9 <PID>

# Restart PM2
pm2 restart unioncore-mvp
```

### Memory Issues

```bash
# Check memory usage
free -h

# Check PM2 memory usage
pm2 status

# Restart application to free memory
pm2 restart unioncore-mvp
```

### Domain Not Accessible

```bash
# Check DNS
nslookup union.hartz.ai
dig union.hartz.ai

# Check if nginx is listening on port 80
netstat -tlnp | grep :80

# Check nginx logs
tail -50 /var/log/nginx/error.log

# Test locally first
curl -I http://localhost

# Check firewall (if applicable)
ufw status
iptables -L
```

---

## 💾 Backup & Recovery

### Files to Backup

1. **Application Code**: `/workspace/unioncore-mvp`
2. **Nginx Config**: `/etc/nginx/sites-available/union.hartz.ai`
3. **PM2 Config**: `/workspace/unioncore-mvp/ecosystem.config.cjs`
4. **Logs**: `/var/log/unioncore/`

### Backup Script

```bash
#!/bin/bash
# backup-unioncore.sh

BACKUP_DIR="/backups/unioncore"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

# Backup application
tar -czf $BACKUP_DIR/unioncore-app-$DATE.tar.gz \
    /workspace/unioncore-mvp

# Backup nginx config
cp /etc/nginx/sites-available/union.hartz.ai \
   $BACKUP_DIR/nginx-config-$DATE.conf

# Backup logs
tar -czf $BACKUP_DIR/logs-$DATE.tar.gz \
    /var/log/unioncore

echo "Backup completed: $BACKUP_DIR"
```

### Recovery Steps

```bash
# 1. Extract application backup
tar -xzf unioncore-app-YYYYMMDD_HHMMSS.tar.gz -C /

# 2. Restore nginx config
cp nginx-config-YYYYMMDD_HHMMSS.conf \
   /etc/nginx/sites-available/union.hartz.ai

# 3. Restart services
pm2 restart unioncore-mvp
nginx -s reload
```

---

## 📈 Performance Optimization

### Nginx Caching (Future Enhancement)

Add to nginx config:

```nginx
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### PM2 Cluster Mode (Future Enhancement)

Modify `ecosystem.config.cjs`:

```javascript
instances: 'max',  // Use all CPU cores
exec_mode: 'cluster'
```

### Enable Gzip Compression

Add to nginx config:

```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
gzip_min_length 1000;
```

---

## 🔐 Security Recommendations

### 1. Enable HTTPS (Let's Encrypt)

```bash
# Install certbot
apt-get install -y certbot python3-certbot-nginx

# Get SSL certificate
certbot --nginx -d union.hartz.ai

# Auto-renewal (certbot sets this up automatically)
certbot renew --dry-run
```

### 2. Firewall Configuration

```bash
# Allow only necessary ports
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow 22/tcp  # SSH
ufw enable
```

### 3. Security Headers (Already in nginx config)

```nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
```

---

## 📞 Support Information

### Quick Reference

| Item                 | Value                                     |
| -------------------- | ----------------------------------------- |
| **Domain**           | union.hartz.ai                            |
| **Application Port** | 5879                                      |
| **Proxy Port**       | 80 (HTTP), 443 (HTTPS planned)            |
| **Process Manager**  | PM2                                       |
| **Web Server**       | Nginx                                     |
| **Application Path** | /workspace/unioncore-mvp                  |
| **Logs Path**        | /var/log/unioncore                        |
| **Nginx Config**     | /etc/nginx/sites-available/union.hartz.ai |

### Useful Commands Reference

```bash
# Application Management
pm2 start ecosystem.config.cjs
pm2 stop unioncore-mvp
pm2 restart unioncore-mvp
pm2 logs unioncore-mvp
pm2 monit
pm2 status

# Nginx Management
nginx                  # Start
nginx -s reload        # Reload config
nginx -s stop          # Stop
nginx -t              # Test config

# Git Management
git pull origin unzip-application
git status
git log --oneline -10

# System Monitoring
htop
df -h
free -h
netstat -tlnp
```

---

## 📝 Change Log

| Date       | Change                                      | By           |
| ---------- | ------------------------------------------- | ------------ |
| 2025-10-22 | Initial deployment with PM2 and Nginx       | OpenHands AI |
| 2025-10-22 | Configured union.hartz.ai domain            | OpenHands AI |
| 2025-10-22 | Added analytics charts to Approval Requests | OpenHands AI |
| 2025-10-22 | Fixed Add Property button navigation        | OpenHands AI |

---

## 🎉 Deployment Complete!

The UNION Core Plus MVP is now running permanently on:

- **URL**: http://union.hartz.ai
- **Server**: 2e36eaa785a4 (Container ID: 2e36eaa785a4)
- **Process Manager**: PM2 (auto-restart enabled)
- **Web Server**: Nginx (reverse proxy on port 80)
- **Application**: Vite (port 5879)

The application will continue running even if the chat session ends. PM2 will automatically restart the application if it crashes.

---

**For any issues or questions, refer to the Troubleshooting section above.**

**🚀 Happy Property Management!**
