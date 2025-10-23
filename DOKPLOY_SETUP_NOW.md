# 🚨 URGENT: Domain Not Configured in Dokploy

## Problem Identified ✅

```
❌ Current Issue:
   union.hartz.ai → Server (65.21.77.45) ✅ DNS works
   → Traefik responds with "404 page not found" ❌
   
✅ Root Cause:
   Domain mapping NOT configured in Dokploy yet!
   
✅ Solution:
   Configure domain in Dokploy dashboard (5 minutes)
```

---

## 🎯 Quick Fix - Access Dokploy Dashboard

### Step 1: Find Your Dokploy Dashboard URL

Dokploy dashboard is usually accessible at one of these:

```
Option 1: https://dokploy.hartz.ai
Option 2: https://your-server-ip:3000
Option 3: https://65.21.77.45:3000
Option 4: http://65.21.77.45:3000
```

**Try each URL** until you find the Dokploy login page.

---

## 📋 Step-by-Step Configuration

### Step 2: Login to Dokploy

1. Open your Dokploy dashboard URL
2. Login with your credentials
3. You should see your projects/applications

### Step 3: Find Your Application

Look for your application. It might be named:
- `unioncore-mvp`
- `unioncore`
- `union-core-plus`
- Or the name you gave it when deploying

**Click on the application** to open settings.

### Step 4: Configure Domain Mapping

Once in your application settings, look for one of these sections:
- **"Domains"** tab
- **"Routing"** section  
- **"Network"** settings
- **"Ports & Domains"**

### Step 5: Add Domain Configuration

Enter these EXACT settings:

```yaml
┌─────────────────────────────────────────┐
│ DOMAIN CONFIGURATION                    │
├─────────────────────────────────────────┤
│                                         │
│ Domain Name:                            │
│ ┌─────────────────────────────────────┐ │
│ │ union.hartz.ai                      │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ Target Port:                            │
│ ┌─────────────────────────────────────┐ │
│ │ 80  (or 5879)                       │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ Protocol:                               │
│ ┌─────────────────────────────────────┐ │
│ │ HTTP                                │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ Path (optional):                        │
│ ┌─────────────────────────────────────┐ │
│ │ /                                   │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ☑ Enable HTTPS                          │
│ ☑ Let's Encrypt                         │
│ ☑ Force HTTPS (redirect HTTP→HTTPS)    │
│                                         │
│         [ Save Configuration ]          │
│                                         │
└─────────────────────────────────────────┘
```

### Step 6: Save and Wait

1. Click **"Save"** or **"Apply"** button
2. Wait **30-60 seconds** for Traefik to reload
3. Test your domain

---

## 🖼️ Visual Guide - What to Look For

### Dokploy Dashboard Layout

```
┌─────────────────────────────────────────────────────────┐
│  Dokploy Dashboard                          [Logout]    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  📁 Projects                                            │
│  └─ My Project                                          │
│      └─ 🚀 unioncore-mvp  ← CLICK HERE                 │
│                                                         │
└─────────────────────────────────────────────────────────┘

After clicking, you'll see tabs like:

┌─────────────────────────────────────────────────────────┐
│  unioncore-mvp                                          │
├─────────────────────────────────────────────────────────┤
│  [General] [Domains] [Environment] [Logs] [Settings]   │
│             ^^^^^^^^                                    │
│             CLICK THIS TAB                              │
└─────────────────────────────────────────────────────────┘
```

---

## 🔍 Alternative: Check Current Container Mapping

If you can't find the dashboard, let's check what Dokploy sees:

### Check Environment Variables in Dokploy

Look for these environment variables in your application settings:
```
VIRTUAL_HOST=union.hartz.ai
LETSENCRYPT_HOST=union.hartz.ai
TRAEFIK_ENABLE=true
```

If these are **not set**, you need to add them!

---

## ⚙️ Alternative Setup Method (if UI doesn't work)

### Option A: Using Docker Labels (Advanced)

If Dokploy uses Docker Compose, you might need to add labels to your container.

**Check if there's a dokploy.yaml or docker-compose.yml file in Dokploy:**

Add these labels:
```yaml
labels:
  - "traefik.enable=true"
  - "traefik.http.routers.unioncore.rule=Host(`union.hartz.ai`)"
  - "traefik.http.routers.unioncore.entrypoints=web"
  - "traefik.http.routers.unioncore-secure.rule=Host(`union.hartz.ai`)"
  - "traefik.http.routers.unioncore-secure.entrypoints=websecure"
  - "traefik.http.routers.unioncore-secure.tls.certresolver=letsencrypt"
  - "traefik.http.services.unioncore.loadbalancer.server.port=80"
```

### Option B: Using Dokploy CLI (if available)

```bash
# From your server (not inside container)
dokploy domain add unioncore-mvp union.hartz.ai --port 80 --https
```

---

## 🧪 Test After Configuration

### Test 1: Check HTTP
```bash
curl -I http://union.hartz.ai
# Expected: 200 OK (or 301 redirect to HTTPS)
```

### Test 2: Check HTTPS (after enabling SSL)
```bash
curl -I https://union.hartz.ai
# Expected: 200 OK with SSL
```

### Test 3: Browser Test
```
Visit: http://union.hartz.ai
Expected: Your application loads!
```

---

## 📊 What Should Happen

### Before Configuration:
```
union.hartz.ai → Traefik → 404 page not found ❌
```

### After Configuration:
```
union.hartz.ai → Traefik → Your Container (Port 80) → Application ✅
```

---

## 🐛 Still Not Working? Troubleshooting

### Issue 1: Can't Find Dokploy Dashboard

**Try these URLs:**
```bash
# Common Dokploy dashboard URLs
curl -I http://65.21.77.45:3000
curl -I https://65.21.77.45:3000
curl -I http://dokploy.hartz.ai
curl -I https://dokploy.hartz.ai

# Check what's running on port 3000
curl http://65.21.77.45:3000
```

**Or SSH into your server:**
```bash
ssh user@65.21.77.45
docker ps | grep dokploy
# Find the Dokploy container and check its ports
```

### Issue 2: Domain Still Shows 404 After Adding

**Check Traefik configuration:**
```bash
# SSH into server
ssh user@65.21.77.45

# Check Traefik logs
docker logs traefik

# Check Dokploy logs
docker logs dokploy

# Restart Traefik
docker restart traefik
```

### Issue 3: Can't Access Dokploy Dashboard

**Reset Dokploy password:**
```bash
# SSH into server
ssh user@65.21.77.45

# Reset Dokploy admin password
docker exec -it dokploy dokploy admin reset-password

# Or restart Dokploy
docker restart dokploy
```

---

## 📞 Contact Dokploy Setup

### Check Dokploy Installation

```bash
# SSH into your server
ssh user@65.21.77.45

# Check if Dokploy is running
docker ps | grep dokploy

# Check Dokploy version
docker exec dokploy dokploy version

# Check Traefik routes
docker exec traefik traefik healthcheck
```

---

## 🎯 Quick Checklist

Before the domain will work, you need:

- [ ] Dokploy dashboard accessible
- [ ] Application visible in Dokploy
- [ ] Domain `union.hartz.ai` added to application
- [ ] Port `80` or `5879` configured
- [ ] Traefik routing enabled
- [ ] Configuration saved
- [ ] Wait 60 seconds for reload
- [ ] Test domain in browser

---

## 📧 Get Help From Dokploy

If you're still stuck, you can:

1. **Check Dokploy Documentation**
   ```
   https://docs.dokploy.com
   ```

2. **Join Dokploy Community**
   - Discord: Dokploy community server
   - GitHub: https://github.com/Dokploy/dokploy

3. **Post in Community**
   - Include: "Domain returns 404, need help with routing"
   - Share: Your domain and port configuration

---

## ✅ Expected Result After Setup

```
✅ http://union.hartz.ai
   → Shows your application

✅ https://union.hartz.ai (after SSL enabled)
   → Shows your application with green padlock

✅ Both ports working:
   - External: 80/443 (HTTP/HTTPS)
   - Internal: 80 (Nginx) or 5879 (Vite)
```

---

## 🚀 Summary

**What you need to do NOW:**

1. **Access Dokploy dashboard** (find the URL)
2. **Find your application** (unioncore-mvp)
3. **Add domain mapping**:
   - Domain: `union.hartz.ai`
   - Port: `80` (or `5879`)
   - Protocol: `HTTP`
   - Enable HTTPS: `Yes`
4. **Save configuration**
5. **Wait 60 seconds**
6. **Test**: http://union.hartz.ai

**Your container is running fine! It's just not connected to the domain in Dokploy.**

---

## 🆘 Need More Help?

If you can provide:
- Screenshot of your Dokploy dashboard
- The Dokploy dashboard URL
- Your Dokploy version

I can give you more specific instructions!

---

**The 404 error is from Traefik, not your application. Your app is ready, we just need to tell Traefik to route union.hartz.ai to your container!**
