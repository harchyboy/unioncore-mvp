# 🚀 Deploy to union.hartz.ai - Manual Steps

**Issue:** Tom's dashboard is merged to main but not visible on union.hartz.ai yet.

**Solution:** Trigger a manual deployment in Dokploy.

---

## 🎯 Quick Fix: Trigger Deployment in Dokploy

### Step 1: Access Dokploy Dashboard

Open one of these URLs:

- **Primary:** https://dokploy.hartz.ai
- **Fallback:** http://65.21.77.45:3000
- **Fallback:** https://65.21.77.45:3000

**Login with your credentials.**

---

### Step 2: Find Your Application

1. Look for project named **"unioncore"** or **"unioncore-mvp"**
2. Click to open it
3. Find the application/service for union.hartz.ai

---

### Step 3: Trigger Rebuild/Redeploy

Look for one of these buttons:

- **"Redeploy"** or **"Deploy"** button
- **"Rebuild"** button
- **"Restart"** button with rebuild option
- **"Git Pull & Rebuild"** option

Click it to trigger a fresh deployment.

---

### Step 4: Monitor Build

1. Watch the build logs in Dokploy
2. Should take 2-5 minutes
3. Look for success message

---

### Step 5: Verify Deployment

Once build completes:

1. Clear your browser cache (Ctrl+Shift+Delete)
2. Go to: https://union.hartz.ai/
3. You should see Tom's new dashboard!

---

## 🔧 Alternative: SSH Deployment

If you have SSH access to the server:

### SSH into Server
```bash
ssh user@65.21.77.45
# or
ssh user@union.hartz.ai
```

### Navigate to App Directory
```bash
cd /path/to/unioncore-mvp
# Common locations:
# /var/lib/dokploy/projects/unioncore/
# /home/deploy/unioncore-mvp/
# /opt/unioncore-mvp/
```

### Pull Latest Code
```bash
git pull origin main
```

### Install Dependencies & Build
```bash
npm install
npm run build
```

### Restart Application
```bash
# If using PM2:
pm2 restart unioncore-mvp

# If using Docker:
docker-compose down
docker-compose up -d --build

# If using systemd:
sudo systemctl restart unioncore-mvp
```

---

## 🐳 Alternative: Docker Rebuild

If deployed via Docker Compose:

### Connect to Server
```bash
ssh user@65.21.77.45
```

### Navigate to Docker Compose Directory
```bash
cd /path/to/unioncore-mvp
```

### Pull and Rebuild
```bash
# Pull latest code
git pull origin main

# Rebuild and restart containers
docker-compose -f docker-compose.production.yml down
docker-compose -f docker-compose.production.yml up -d --build

# Or use Dokploy's managed deployment
```

---

## 📊 What You Should See After Deployment

### Before (Current - Old Dashboard)
- Simple HTML dashboard
- User switcher with Tom, Max, Dani
- Basic executive dashboard

### After (New - Tom's Dashboard)
- **React-based dashboard**
- **Three-column layout:**
  - Left: Portfolio (42 properties, 90.5% occupancy, £2.4M revenue)
  - Center: Lead Pipeline (funnel, recent activity, sources)
  - Right: Brokers (24 partners, top performers, commissions)
- **Quick Actions bar**
- **Professional UI with shadcn/ui components**

---

## 🔍 Troubleshooting

### Dashboard Not Updating?

**Check 1: Browser Cache**
```
Clear cache: Ctrl+Shift+Delete
Hard refresh: Ctrl+Shift+R
Try incognito mode
```

**Check 2: Deployment Status**
- Check Dokploy logs for errors
- Verify build completed successfully
- Check container/process is running

**Check 3: Correct Branch**
- Verify Dokploy is deploying from **main** branch
- Check git branch in deployment settings

**Check 4: Build Output**
- Verify `/dist/public/` directory was created
- Check for build errors in logs

---

## 📋 Deployment Checklist

- [ ] Access Dokploy dashboard
- [ ] Find unioncore application
- [ ] Click "Redeploy" or "Rebuild"
- [ ] Monitor build logs
- [ ] Wait for completion (2-5 min)
- [ ] Clear browser cache
- [ ] Visit union.hartz.ai
- [ ] Verify Tom's dashboard loads
- [ ] Test interactions

---

## 🎯 Expected Result

After deployment, visiting **https://union.hartz.ai/** should show:

```
┌──────────────────────────────────────────────────────────┐
│  🏢 UNION Core                                           │
│  Portfolio & Marketing                                   │
│                                                          │
│  [🔍 Search] [🔔 Notifications (8)] [👤 Tom]           │
├──────────────────────────────────────────────────────────┤
│  [+ Add Lead] [Update Property] [Schedule] [Contact]    │
├─────────────┬────────────────────────┬──────────────────┤
│  PORTFOLIO  │   LEAD PIPELINE        │   BROKERS        │
│             │                        │                  │
│  42 Props   │  100→78→45→32→18      │  24 Partners    │
│  90.5% Occ  │                        │  18 Active      │
│  £2.4M Rev  │  [Recent Leads...]    │  [Top 3...]     │
└─────────────┴────────────────────────┴──────────────────┘
```

---

## 🚨 If Still Having Issues

### Option 1: Check Current Branch
The deployment might be pulling from a different branch. In Dokploy:
1. Go to application settings
2. Check "Git Branch" setting
3. Ensure it's set to **main**
4. Save and redeploy

### Option 2: Manual Build
SSH into server and manually build:
```bash
cd /path/to/unioncore-mvp
git checkout main
git pull origin main
npm install
npm run build
# Restart application
```

### Option 3: Check Dockerfile
Verify Dockerfile is building the React app:
```bash
cat Dockerfile
# Should include:
# npm run build
# COPY dist/public /app/public
```

---

## 💡 Quick Test

To verify the code is on the server:

```bash
# SSH into server
ssh user@65.21.77.45

# Check if TomDashboard.tsx exists
find / -name "TomDashboard.tsx" 2>/dev/null

# If found, the code is there - just needs rebuild
```

---

## ✅ Success Indicators

Deployment successful when:
- [x] Build completes with no errors
- [x] Application restarts successfully  
- [x] union.hartz.ai loads without errors
- [x] Tom's dashboard shows (not old HTML version)
- [x] Three-column layout is visible
- [x] Quick action buttons present
- [x] No console errors in browser

---

## 📞 Need Help?

If you're unable to access Dokploy or need assistance:

1. **Check Dokploy is running:**
   ```bash
   ssh user@65.21.77.45
   docker ps | grep dokploy
   ```

2. **Check application logs:**
   ```bash
   docker logs unioncore-mvp
   # or
   pm2 logs unioncore-mvp
   ```

3. **Restart Dokploy:**
   ```bash
   docker restart dokploy
   ```

---

**Summary:** The code is merged to main on GitHub. You just need to trigger a rebuild in Dokploy (or manually on the server) to see Tom's dashboard at union.hartz.ai.

**Fastest Path:** 
1. Open Dokploy dashboard
2. Click "Redeploy" on unioncore app
3. Wait 3-5 minutes
4. Refresh union.hartz.ai

🚀 **Your dashboard is ready to deploy!**
