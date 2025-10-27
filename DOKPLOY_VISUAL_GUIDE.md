# 🎨 Visual Guide: Dokploy Deployment

## Where to Find Settings in Dokploy Dashboard

### Main Dashboard View

```
╔═══════════════════════════════════════════════════════════════╗
║  DOKPLOY                                          [👤 Admin] ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║  📊 Dashboard    📁 Projects    🐳 Containers    ⚙️ Settings  ║
║                    ^^^^^^^                                    ║
║                    CLICK HERE                                 ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```

---

### Projects Page

```
╔═══════════════════════════════════════════════════════════════╗
║  📁 Projects                              [+ New Project]     ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║  ┌─────────────────────────────────────────────────────────┐ ║
║  │  unioncore                                 [⚙️] [🗑️]    │ ║
║  │  UNION Core Plus MVP Application                        │ ║
║  │  ────────────────────────────────────────────────────   │ ║
║  │  📦 1 application    🟢 Running                         │ ║
║  │                                                          │ ║
║  │  [Open Project >]                                       │ ║
║  │      ^^^^^^^                                            │ ║
║  │      CLICK HERE                                         │ ║
║  └─────────────────────────────────────────────────────────┘ ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```

---

### Inside Project - Applications List

```
╔═══════════════════════════════════════════════════════════════╗
║  unioncore                                 [+ Add Application]║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║  Applications                                                 ║
║                                                               ║
║  ┌─────────────────────────────────────────────────────────┐ ║
║  │  🚀 unioncore-mvp                       [⚙️] [🗑️]       │ ║
║  │  ────────────────────────────────────────────────────   │ ║
║  │  Status: 🟢 Running    Uptime: 16m    Restarts: 0      │ ║
║  │  Port: 80    Memory: 78MB    CPU: 0.1%                 │ ║
║  │                                                          │ ║
║  │  [View Details >]  [Restart]  [Logs]                   │ ║
║  │   ^^^^^^^^^^^^^                                         │ ║
║  │   CLICK HERE                                            │ ║
║  └─────────────────────────────────────────────────────────┘ ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```

---

### Application Details Page (THIS IS WHERE YOU CONFIGURE!)

```
╔═══════════════════════════════════════════════════════════════╗
║  🚀 unioncore-mvp                    🟢 Running   [Actions ▼]║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║  [Overview] [Domains] [Environment] [Logs] [Terminal] [⚙️]   ║
║             ^^^^^^^^                                          ║
║             CLICK HERE TO CONFIGURE DOMAIN                    ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```

---

### Domains Tab - Where the Magic Happens! ✨

```
╔═══════════════════════════════════════════════════════════════╗
║  Domains                                      [+ Add Domain]  ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║  ┌─────────────────────────────────────────────────────────┐ ║
║  │  Add New Domain                                          │ ║
║  │  ────────────────────────────────────────────────────   │ ║
║  │                                                          │ ║
║  │  Domain Name *                                           │ ║
║  │  ┌────────────────────────────────────────────────────┐ │ ║
║  │  │  union.hartz.ai                                    │ │ ║
║  │  │         ▲                                           │ │ ║
║  │  │         ENTER YOUR DOMAIN HERE                     │ │ ║
║  │  └────────────────────────────────────────────────────┘ │ ║
║  │                                                          │ ║
║  │  Target Port *                                           │ ║
║  │  ┌────────────────────────────────────────────────────┐ │ ║
║  │  │  80                                                 │ │ ║
║  │  │   ▲                                                 │ │ ║
║  │  │   ENTER 80 HERE                                    │ │ ║
║  │  └────────────────────────────────────────────────────┘ │ ║
║  │                                                          │ ║
║  │  Protocol                                                │ ║
║  │  ○ HTTP    ⦿ HTTPS    ○ Auto                            │ ║
║  │            ▲                                             │ ║
║  │            SELECT HTTPS                                 │ ║
║  │                                                          │ ║
║  │  SSL/TLS                                                 │ ║
║  │  ☑ Enable HTTPS                                         │ ║
║  │  ☑ Let's Encrypt (automatic certificate)               │ ║
║  │  ☑ Force HTTPS (redirect HTTP to HTTPS)                │ ║
║  │  ☐ Use custom certificate                               │ ║
║  │                                                          │ ║
║  │  Path (optional)                                         │ ║
║  │  ┌────────────────────────────────────────────────────┐ │ ║
║  │  │  /                                                  │ │ ║
║  │  └────────────────────────────────────────────────────┘ │ ║
║  │                                                          │ ║
║  │                  [Cancel]  [Save Domain]                │ ║
║  │                              ^^^^^^^^^^^^               │ ║
║  │                              CLICK TO SAVE              │ ║
║  └─────────────────────────────────────────────────────────┘ ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```

---

### After Saving - Domains List

```
╔═══════════════════════════════════════════════════════════════╗
║  Domains                                      [+ Add Domain]  ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║  Current Domains                                              ║
║                                                               ║
║  ┌─────────────────────────────────────────────────────────┐ ║
║  │  🌐 union.hartz.ai                       [Edit] [Delete] │ ║
║  │  ────────────────────────────────────────────────────   │ ║
║  │  Port: 80                                                │ ║
║  │  Protocol: HTTPS                                         │ ║
║  │  SSL: 🟢 Active (Let's Encrypt)                         │ ║
║  │  Certificate: Valid until 2026-01-21                    │ ║
║  │  Force HTTPS: ✅ Enabled                                │ ║
║  │                                                          │ ║
║  │  Status: 🟢 Active                                      │ ║
║  │  Last Check: 1 minute ago                               │ ║
║  └─────────────────────────────────────────────────────────┘ ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```

---

## Visual Flow: What Happens When You Save

### Step 1: You Click "Save Domain"

```
┌──────────────────────────┐
│  YOU                     │
│  Click "Save Domain"     │
└───────────┬──────────────┘
            │
            ▼
┌───────────────────────────────────────┐
│  Dokploy                              │
│  Receives configuration:              │
│  - Domain: union.hartz.ai             │
│  - Port: 80                           │
│  - SSL: Yes                           │
└───────────┬───────────────────────────┘
            │
            ▼
```

### Step 2: Dokploy Updates Traefik

```
┌───────────────────────────────────────┐
│  Traefik Configuration                │
│  Dokploy adds routing rules:          │
│                                       │
│  [Router: unioncore-http]             │
│  Rule: Host(`union.hartz.ai`)         │
│  EntryPoint: web (80)                 │
│  Middleware: redirect-to-https        │
│                                       │
│  [Router: unioncore-https]            │
│  Rule: Host(`union.hartz.ai`)         │
│  EntryPoint: websecure (443)          │
│  TLS: Let's Encrypt                   │
│                                       │
│  [Service: unioncore]                 │
│  Target: container port 80            │
└───────────┬───────────────────────────┘
            │
            ▼
```

### Step 3: Let's Encrypt Certificate Request

```
┌───────────────────────────────────────┐
│  Traefik                              │
│  Requests SSL certificate from        │
│  Let's Encrypt                        │
└───────────┬───────────────────────────┘
            │
            ▼
┌───────────────────────────────────────┐
│  Let's Encrypt                        │
│  Sends HTTP-01 challenge:             │
│  "Please serve this token at:         │
│   http://union.hartz.ai/              │
│     .well-known/acme-challenge/..."   │
└───────────┬───────────────────────────┘
            │
            ▼
┌───────────────────────────────────────┐
│  Traefik                              │
│  Serves challenge token               │
│  (Traefik intercepts this request)    │
└───────────┬───────────────────────────┘
            │
            ▼
┌───────────────────────────────────────┐
│  Let's Encrypt                        │
│  Verifies challenge                   │
│  ✅ Success!                          │
│  Issues certificate                   │
└───────────┬───────────────────────────┘
            │
            ▼
┌───────────────────────────────────────┐
│  Traefik                              │
│  Receives certificate                 │
│  Configures SSL                       │
│  ✅ HTTPS now active!                 │
└───────────────────────────────────────┘
```

### Step 4: Traffic Flow After Setup

```
┌─────────────────────────┐
│  User's Browser         │
│  https://union.hartz.ai │
└──────────┬──────────────┘
           │
           ▼
┌────────────────────────────────┐
│  DNS Resolution                │
│  union.hartz.ai → 65.21.77.45  │
└──────────┬─────────────────────┘
           │
           ▼
┌────────────────────────────────────┐
│  Traefik (Port 443)                │
│  ✅ SSL Termination                │
│  ✅ Route matching                 │
│  ✅ Forward to container           │
└──────────┬─────────────────────────┘
           │ HTTP (no SSL)
           ▼
┌────────────────────────────────────┐
│  Container: unioncore-mvp          │
│  Port 80 (Nginx)                   │
└──────────┬─────────────────────────┘
           │
           ▼
┌────────────────────────────────────┐
│  Nginx Reverse Proxy               │
│  ✅ Serve static files             │
│  ✅ Proxy to Vite                  │
└──────────┬─────────────────────────┘
           │
           ▼
┌────────────────────────────────────┐
│  Vite Dev Server (Port 5879)       │
│  ✅ Serve application              │
└────────────────────────────────────┘
```

---

## Common UI Patterns in Different Dokploy Versions

### Pattern 1: Tabbed Interface

```
┌──────────────────────────────────────────┐
│ [General] [Domains] [Env] [Logs]         │
├──────────────────────────────────────────┤
│                                          │
│  Domain settings shown here...           │
│                                          │
└──────────────────────────────────────────┘
```

### Pattern 2: Sidebar Navigation

```
┌─────────┬────────────────────────────────┐
│ General │  Domain Configuration          │
│ Domains │                                │
│   ◄─────┤  Domain: union.hartz.ai        │
│ Env     │  Port: 80                      │
│ Logs    │  SSL: Enabled                  │
│         │                                │
└─────────┴────────────────────────────────┘
```

### Pattern 3: Accordion/Expandable Sections

```
┌──────────────────────────────────────────┐
│ ▼ General Settings                       │
│   (expanded content)                     │
│                                          │
│ ▼ Domain Configuration                   │
│   Domain: union.hartz.ai                 │
│   Port: 80                               │
│   ◄────── CONFIGURE HERE                 │
│                                          │
│ ▶ Environment Variables                  │
│                                          │
│ ▶ Advanced Settings                      │
└──────────────────────────────────────────┘
```

---

## What Each Setting Does

### Domain Name Field
```
┌────────────────────────────────────┐
│  union.hartz.ai                    │
└────────────────────────────────────┘
     ▲
     │
     Tells Traefik: "When someone
     visits this domain, route to
     this container"
```

### Target Port Field
```
┌────────────────────────────────────┐
│  80                                │
└────────────────────────────────────┘
     ▲
     │
     Tells Traefik: "Forward requests
     to port 80 inside the container"
```

### Protocol Selection
```
○ HTTP    ⦿ HTTPS    ○ Auto
          ▲
          │
          Enables SSL/TLS encryption
          Required for Let's Encrypt
```

### SSL Checkboxes
```
☑ Enable HTTPS
▲
│ Activates HTTPS on this domain

☑ Let's Encrypt
▲
│ Automatically requests and manages
│ SSL certificates

☑ Force HTTPS
▲
│ Redirects all HTTP requests to HTTPS
│ (http:// → https://)
```

---

## Visual Troubleshooting

### ❌ Problem: Domain shows 404

```
Browser → Traefik → ❌ No route found → 404

Solution:
Check if domain is configured in Dokploy
Look for this in Domains tab:
┌────────────────────────────┐
│ 🌐 union.hartz.ai          │
│ Status: 🟢 Active          │
└────────────────────────────┘

If not there → Add domain!
```

### ❌ Problem: SSL not working

```
Browser → Traefik → ⚠️ No certificate → Error

Check certificate status:
┌────────────────────────────┐
│ 🌐 union.hartz.ai          │
│ SSL: ❌ No certificate     │
└────────────────────────────┘

Solution:
☑ Enable HTTPS
☑ Let's Encrypt
Then wait 60 seconds
```

### ✅ Everything Working

```
Browser → Traefik → Container → App → ✅

Domain status should show:
┌────────────────────────────┐
│ 🌐 union.hartz.ai          │
│ Status: 🟢 Active          │
│ SSL: 🟢 Valid              │
│ Certificate: Let's Encrypt │
│ Expires: 2026-01-21        │
└────────────────────────────┘
```

---

## Quick Reference Card

Print this and keep it handy!

```
┌─────────────────────────────────────────────────┐
│  DOKPLOY DOMAIN SETUP CHEAT SHEET              │
├─────────────────────────────────────────────────┤
│                                                 │
│  1. Dashboard → Projects → unioncore            │
│                                                 │
│  2. Click on: unioncore-mvp                     │
│                                                 │
│  3. Go to: Domains tab                          │
│                                                 │
│  4. Click: [+ Add Domain]                       │
│                                                 │
│  5. Enter:                                      │
│     Domain: union.hartz.ai                      │
│     Port: 80                                    │
│     Protocol: HTTPS                             │
│                                                 │
│  6. Enable:                                     │
│     ☑ Enable HTTPS                              │
│     ☑ Let's Encrypt                             │
│     ☑ Force HTTPS                               │
│                                                 │
│  7. Click: [Save Domain]                        │
│                                                 │
│  8. Wait: 60 seconds                            │
│                                                 │
│  9. Test: https://union.hartz.ai                │
│                                                 │
│  ✅ Done!                                       │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## Screenshots Guide

If you can share screenshots, take these:

### Screenshot 1: Main Dashboard
- Shows projects list
- Helps identify correct UI version

### Screenshot 2: Application Page
- Shows where the Domains tab is
- Shows application status

### Screenshot 3: Domains Configuration
- Shows the domain form
- Shows what fields to fill

Send these and I can give you exact instructions!

---

## 🎯 Remember

**The key is finding the "Domains" section in your application settings.**

It might be called:
- "Domains"
- "Routing"
- "Network & Domains"
- "External Access"
- "Public Domains"

But the configuration is always similar:
1. Domain name
2. Target port
3. SSL options

---

**Good luck! You're almost there! 🚀**
