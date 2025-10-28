# 🚀 Complete Dokploy Deployment Guide

## How to Deploy UNION Core Plus on Dokploy

This guide shows you exactly how to create and deploy your application in Dokploy with proper domain mapping and SSL.

---

## 📋 Prerequisites

- ✅ Dokploy installed on your server
- ✅ Domain pointing to your server (union.hartz.ai → 65.21.77.45)
- ✅ GitHub repository with code (optional, can use Docker Compose)
- ✅ Docker Compose file (provided in this repo)

---

## 🎯 Method 1: Deploy via Dokploy Dashboard (Recommended)

### Step 1: Access Dokploy Dashboard

Open your Dokploy dashboard. Common URLs:

```
Primary:   https://dokploy.hartz.ai
Fallback:  http://65.21.77.45:3000
Fallback:  https://65.21.77.45:3000
```

**Login with your credentials.**

---

### Step 2: Create New Project

1. Click **"New Project"** or **"Create Project"**
2. Enter project details:
   ```
   Project Name:    unioncore
   Description:     UNION Core Plus MVP Application
   ```
3. Click **"Create"**

---

### Step 3: Add Application to Project

1. Open your **"unioncore"** project
2. Click **"Add Application"** or **"New Service"**
3. Choose deployment method:

#### Option A: Deploy from GitHub
```
Name:           unioncore-mvp
Source:         GitHub
Repository:     harchyboy/unioncore-mvp
Branch:         unzip-application
Build Method:   Dockerfile
```

#### Option B: Deploy from Docker Compose
```
Name:           unioncore-mvp
Source:         Docker Compose
File:           Upload docker-compose.production.yml
```

4. Click **"Next"** or **"Continue"**

---

### Step 4: Configure Build Settings

```yaml
Build Configuration:
  ├─ Build Context:     ./
  ├─ Dockerfile:        Dockerfile
  └─ Build Args:        (none needed)

Container Settings:
  ├─ Restart Policy:    unless-stopped
  ├─ Container Name:    unioncore-mvp
  └─ Network Mode:      bridge
```

---

### Step 5: Configure Ports (IMPORTANT!)

Add these port mappings:

```
┌──────────────────────────────────────────┐
│ PORT MAPPINGS                            │
├──────────────────────────────────────────┤
│                                          │
│ Container Port: 80                       │
│ Protocol:       TCP                      │
│ Publish:        ✅ Yes                   │
│                                          │
│ Container Port: 5879                     │
│ Protocol:       TCP                      │
│ Publish:        ✅ Yes (optional)        │
│                                          │
└──────────────────────────────────────────┘
```

**Important:** Port 80 MUST be accessible from the container!

---

### Step 6: Configure Domain & SSL (CRITICAL!)

This is where the magic happens! 

```yaml
Domain Configuration:
┌──────────────────────────────────────────┐
│ DOMAIN SETTINGS                          │
├──────────────────────────────────────────┤
│                                          │
│ Domain Name:                             │
│   union.hartz.ai                         │
│                                          │
│ Target Port:                             │
│   80                                     │
│                                          │
│ Protocol:                                │
│   ○ HTTP  ⦿ HTTPS  ○ Auto               │
│                                          │
│ SSL/TLS:                                 │
│   ☑ Enable HTTPS                         │
│   ☑ Let's Encrypt                        │
│   ☑ Force HTTPS (redirect HTTP→HTTPS)   │
│   ☐ Use custom certificate               │
│                                          │
│ Path:                                    │
│   /  (root)                              │
│                                          │
│ Headers (optional):                      │
│   X-Forwarded-Proto: https               │
│   X-Forwarded-Host: union.hartz.ai       │
│                                          │
└──────────────────────────────────────────┘
```

**Settings breakdown:**
- **Domain Name**: `union.hartz.ai` (your full domain)
- **Target Port**: `80` (the port your app listens on inside container)
- **Protocol**: Select HTTPS
- **Enable HTTPS**: ✅ Check this
- **Let's Encrypt**: ✅ Check this (for automatic SSL)
- **Force HTTPS**: ✅ Check this (redirects HTTP to HTTPS)

---

### Step 7: Environment Variables (Optional)

Add these if needed:

```env
NODE_ENV=production
PORT=5879
VITE_PORT=5879
VITE_HOST=0.0.0.0
```

Most apps won't need these as they're already in the Dockerfile.

---

### Step 8: Deploy!

1. Review all settings
2. Click **"Deploy"** or **"Create & Deploy"**
3. Wait for deployment (2-5 minutes)
4. Check deployment logs for errors

---

### Step 9: Verify Deployment

#### Check Deployment Status
```
Status: Running ✅
Uptime: X minutes
Restarts: 0
Health: Healthy
```

#### Check Logs
Click **"Logs"** tab and verify:
```
✅ PM2 process manager started
✅ Vite running on port 5879
✅ Nginx started successfully
✅ Application ready
```

#### Test Domain
```bash
# Test HTTP (should redirect to HTTPS)
curl -I http://union.hartz.ai

# Test HTTPS
curl -I https://union.hartz.ai
# Expected: HTTP/2 200

# Browser test
Visit: https://union.hartz.ai
Expected: ✅ Application loads with green padlock
```

---

## 🎯 Method 2: Deploy Using Dokploy CLI

If you prefer command line:

### Step 1: SSH into Server
```bash
ssh user@65.21.77.45
```

### Step 2: Navigate to Dokploy
```bash
cd /opt/dokploy  # or wherever Dokploy is installed
```

### Step 3: Create Project
```bash
dokploy project create unioncore
```

### Step 4: Deploy Application
```bash
dokploy app create unioncore-mvp \
  --project unioncore \
  --source github \
  --repo harchyboy/unioncore-mvp \
  --branch unzip-application \
  --dockerfile Dockerfile

dokploy app deploy unioncore-mvp
```

### Step 5: Add Domain
```bash
dokploy domain add unioncore-mvp \
  --domain union.hartz.ai \
  --port 80 \
  --https \
  --letsencrypt \
  --force-https
```

### Step 6: Verify
```bash
dokploy app status unioncore-mvp
dokploy app logs unioncore-mvp
```

---

## 🎯 Method 3: Deploy Using Docker Compose File

### Step 1: Copy docker-compose File

Use the provided `docker-compose.production.yml` file from this repository.

### Step 2: Upload to Dokploy

In Dokploy dashboard:
1. Click **"New Application"**
2. Select **"Docker Compose"**
3. Upload `docker-compose.production.yml`
4. Click **"Deploy"**

**The docker-compose file already includes:**
- ✅ Traefik labels for routing
- ✅ Domain configuration (union.hartz.ai)
- ✅ SSL/Let's Encrypt setup
- ✅ Port mappings
- ✅ Health checks
- ✅ Auto-restart policy

### Step 3: Verify in Dokploy

Dokploy should automatically:
- ✅ Build the Docker image
- ✅ Start the container
- ✅ Configure Traefik routing
- ✅ Request Let's Encrypt certificate
- ✅ Set up HTTPS redirect

---

## 🔍 Troubleshooting Dokploy Deployment

### Issue 1: Application Shows 404

**Symptoms:**
```bash
curl http://union.hartz.ai
# Returns: 404 page not found
```

**Cause:** Domain not properly configured in Dokploy/Traefik

**Solution:**
1. Go to application settings in Dokploy
2. Check **"Domains"** tab
3. Verify domain is added: `union.hartz.ai`
4. Verify target port is correct: `80`
5. Click **"Save"** and wait 60 seconds
6. Test again

### Issue 2: Container Not Starting

**Check logs:**
```bash
# In Dokploy dashboard, click "Logs" tab
# Or via CLI:
docker logs unioncore-mvp
```

**Common issues:**
- Port already in use
- Build failed
- Missing environment variables

**Solution:**
```bash
# Restart container
docker restart unioncore-mvp

# Or rebuild
docker-compose up -d --build
```

### Issue 3: SSL Certificate Not Issued

**Symptoms:**
- Domain works on HTTP but not HTTPS
- Certificate error in browser

**Cause:** Let's Encrypt challenge failed

**Check:**
```bash
# View Traefik logs
docker logs traefik | grep -i "union.hartz.ai"

# Check certificate status
docker exec traefik cat /acme.json | grep union.hartz.ai
```

**Common causes:**
1. **Port 80 not accessible** from internet
2. **DNS not propagated** yet (wait 10-15 minutes)
3. **Rate limit** hit (max 5 certs per domain per week)

**Solution:**
```bash
# Check if port 80 is accessible
curl -I http://union.hartz.ai/.well-known/acme-challenge/test

# Wait for DNS propagation
dig union.hartz.ai +short
# Should return: 65.21.77.45

# Force certificate renewal (if needed)
docker restart traefik
```

### Issue 4: Domain Works But Shows Wrong Content

**Symptoms:**
- Domain loads but shows different application
- Shows Traefik dashboard instead of your app

**Cause:** Routing conflict or wrong port

**Solution:**
1. Check Traefik labels in docker-compose
2. Verify target port is `80` (not 5879)
3. Check for conflicting routes
4. Restart Traefik: `docker restart traefik`

### Issue 5: Can't Access Dokploy Dashboard

**Try these URLs:**
```bash
# Common Dokploy dashboard URLs
http://65.21.77.45:3000
https://65.21.77.45:3000
https://dokploy.hartz.ai
http://dokploy.hartz.ai
```

**If still can't access:**
```bash
# SSH into server
ssh user@65.21.77.45

# Check if Dokploy is running
docker ps | grep dokploy

# Restart Dokploy
docker restart dokploy

# Check Dokploy logs
docker logs dokploy
```

---

## 📊 What Happens After Deployment

### The Flow:

```
┌─────────────────────────────────────────────┐
│  1. User visits https://union.hartz.ai      │
└──────────────┬──────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────┐
│  2. DNS resolves to 65.21.77.45             │
└──────────────┬──────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────┐
│  3. Traefik receives request on port 443    │
│     - Terminates SSL                        │
│     - Checks routing rules                  │
│     - Finds: Host(`union.hartz.ai`)         │
└──────────────┬──────────────────────────────┘
               │ (HTTP, no SSL)
               ▼
┌─────────────────────────────────────────────┐
│  4. Forwards to container port 80           │
│     Container: unioncore-mvp                │
└──────────────┬──────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────┐
│  5. Nginx receives request on port 80       │
│     - Serves static files                   │
│     - Proxies API requests                  │
└──────────────┬──────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────┐
│  6. Vite serves application on port 5879    │
│     (internal, accessed via Nginx proxy)    │
└──────────────┬──────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────┐
│  7. Response flows back through chain       │
│     Vite → Nginx → Traefik → User          │
└─────────────────────────────────────────────┘
```

### SSL Certificate Management:

```
Day 0:    Deployment
          ↓
Day 0:    Let's Encrypt request
          ├─ HTTP-01 challenge
          ├─ Certificate issued
          └─ Valid for 90 days
          
Day 30:   First renewal check
          └─ Too early, skipped
          
Day 60:   Second renewal check
          └─ Certificate renewed automatically
          
Day 90:   Old certificate expires
          └─ New certificate already active
          
Day 120:  Third renewal check
          └─ Certificate renewed automatically
          
...       (Continues forever)
```

---

## ✅ Deployment Checklist

Use this checklist when deploying:

### Pre-Deployment
- [ ] Dokploy dashboard accessible
- [ ] GitHub repository ready (if using GitHub)
- [ ] Docker Compose file prepared (if using Docker Compose)
- [ ] DNS pointing to server (union.hartz.ai → 65.21.77.45)
- [ ] Port 80 and 443 open on server firewall

### Deployment Steps
- [ ] Create project in Dokploy
- [ ] Add application to project
- [ ] Configure build settings
- [ ] Map ports (80, optionally 5879)
- [ ] Add domain: union.hartz.ai
- [ ] Set target port: 80
- [ ] Enable HTTPS and Let's Encrypt
- [ ] Enable force HTTPS redirect
- [ ] Click Deploy

### Post-Deployment Verification
- [ ] Container status: Running
- [ ] Container logs: No errors
- [ ] Health check: Passing
- [ ] HTTP works: `curl http://union.hartz.ai`
- [ ] HTTPS works: `curl https://union.hartz.ai`
- [ ] Browser test: https://union.hartz.ai
- [ ] Green padlock visible
- [ ] Certificate issuer: Let's Encrypt
- [ ] HTTP redirects to HTTPS

### Optional Checks
- [ ] PM2 status: `docker exec unioncore-mvp pm2 status`
- [ ] Nginx status: `docker exec unioncore-mvp nginx -t`
- [ ] View logs: Check Dokploy logs tab
- [ ] Resource usage: Check CPU/Memory in Dokploy

---

## 🎯 Quick Reference

### Dokploy Dashboard Sections

```
Dokploy Dashboard
├─ Projects
│  └─ unioncore
│     └─ Applications
│        └─ unioncore-mvp
│           ├─ Overview        ← Deployment status
│           ├─ Logs            ← View application logs
│           ├─ Terminal        ← Access container shell
│           ├─ Environment     ← Set ENV variables
│           ├─ Domains         ← Configure domain/SSL
│           ├─ Volumes         ← Mount persistent storage
│           ├─ Networks        ← Network settings
│           └─ Settings        ← General settings
└─ Traefik
   ├─ Routes                   ← View all routes
   ├─ Certificates             ← SSL certificates
   └─ Middleware               ← Traefik middleware
```

### Important Settings

```yaml
Application Name:     unioncore-mvp
Domain:              union.hartz.ai
Target Port:         80
Protocol:            HTTPS
SSL Provider:        Let's Encrypt
Force HTTPS:         Yes
Auto-Restart:        Yes
Health Check:        Enabled
```

### Useful Commands

```bash
# View container logs
docker logs unioncore-mvp

# Access container shell
docker exec -it unioncore-mvp bash

# Check PM2 status inside container
docker exec unioncore-mvp pm2 status

# Restart application
docker restart unioncore-mvp

# View Traefik logs
docker logs traefik

# Check Traefik routing
docker exec traefik cat /etc/traefik/traefik.yml

# Force certificate renewal
docker restart traefik
```

---

## 📚 Additional Resources

### Files in This Repository

1. **docker-compose.production.yml**
   - For Dokploy deployment with Traefik
   - Includes all labels and routing

2. **docker-compose.standalone.yml**
   - For standalone Docker deployment
   - Without Dokploy/Traefik

3. **Dockerfile**
   - Multi-stage build configuration
   - Optimized for production

4. **ecosystem.config.cjs**
   - PM2 configuration
   - Auto-restart and clustering

5. **start-unioncore.sh**
   - Startup script
   - Runs PM2 and Nginx

### Documentation Files

- **DOKPLOY_SETUP_NOW.md** - Urgent setup guide
- **SSL_QUICK_START.md** - SSL configuration
- **SSL_SETUP_DOKPLOY.md** - Detailed SSL guide
- **DOKPLOY_CONFIG.md** - Configuration reference
- **DEPLOYMENT.md** - General deployment guide
- **DEPLOYMENT_SUMMARY.md** - Quick reference

---

## 🆘 Need Help?

### Dokploy Support

- **Docs:** https://docs.dokploy.com
- **GitHub:** https://github.com/Dokploy/dokploy
- **Discord:** Dokploy community server

### Our Application

- **GitHub:** https://github.com/harchyboy/unioncore-mvp
- **Branch:** unzip-application
- **Issues:** Report on GitHub Issues

---

## 🎉 Success Criteria

Your deployment is successful when:

```
✅ https://union.hartz.ai loads in browser
✅ Green padlock (SSL) is visible
✅ Certificate issued by Let's Encrypt
✅ HTTP automatically redirects to HTTPS
✅ Application functions correctly
✅ No errors in container logs
✅ Container auto-restarts on failure
✅ PM2 shows "online" status
```

---

## 📝 Summary

**To deploy in Dokploy:**

1. **Access Dokploy dashboard**
2. **Create new project** (unioncore)
3. **Add application** (GitHub or Docker Compose)
4. **Configure domain** (union.hartz.ai)
5. **Set port** (80)
6. **Enable SSL** (Let's Encrypt)
7. **Deploy** and wait
8. **Test** https://union.hartz.ai

**That's it! Dokploy handles the rest.**

---

**Last Updated:** 2025-10-23  
**Application:** UNION Core Plus MVP  
**Domain:** union.hartz.ai  
**Repository:** harchyboy/unioncore-mvp
