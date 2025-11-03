# 🚀 Dokploy Deployment Guide - UNION Core Plus

## ✅ Project Status

**All issues fixed!** The application now works perfectly with Tailwind CSS v3 (stable).

---

## 📦 Quick Deployment Steps

### 1️⃣ Prepare Your Repository

```bash
# Commit all changes
git add -A
git commit -m "Ready for Dokploy deployment"
git push origin main
```

### 2️⃣ Dokploy Configuration

#### **Option A: Using GitHub (Recommended)**

1. **In Dokploy Dashboard:**
   - Click "Create Application"
   - Select "GitHub" as source
   - Connect your repository: `harchyboy/unioncore-mvp`
   - Branch: `main`

2. **Build Configuration:**

   ```yaml
   Build Type: Dockerfile
   Dockerfile Path: ./Dockerfile
   Build Context: .
   ```

3. **Port Configuration:**

   ```
   Container Port: 5879
   Published Port: 80 (or any port you prefer)
   ```

4. **Environment Variables:**
   ```bash
   NODE_ENV=production
   PORT=5879
   HOST=0.0.0.0
   ```

#### **Option B: Using Docker Compose**

1. **Upload docker-compose.yml:**

   ```yaml
   version: "3.8"

   services:
     unioncore:
       build:
         context: .
         dockerfile: Dockerfile
       ports:
         - "5879:5879"
       environment:
         - NODE_ENV=production
         - PORT=5879
         - HOST=0.0.0.0
       restart: unless-stopped
       healthcheck:
         test:
           [
             "CMD",
             "wget",
             "--no-verbose",
             "--tries=1",
             "--spider",
             "http://localhost:5879/",
           ]
         interval: 30s
         timeout: 10s
         retries: 3
   ```

2. **Deploy:**
   - Upload `docker-compose.yml` to Dokploy
   - Click "Deploy"

---

## 🔌 Port Configuration

### **Which Port to Open in Dokploy:**

| Setting                     | Value             | Description                   |
| --------------------------- | ----------------- | ----------------------------- |
| **Container Port**          | `5879`            | Internal application port     |
| **Published/External Port** | `80` or `443`     | Public-facing port            |
| **Domain**                  | `your-domain.com` | Your custom domain (optional) |

### **Port Mapping Examples:**

1. **Standard HTTP (Port 80):**

   ```
   Container: 5879 → External: 80
   Access: http://your-server-ip/
   ```

2. **Custom Port:**

   ```
   Container: 5879 → External: 8080
   Access: http://your-server-ip:8080/
   ```

3. **With Domain + SSL:**
   ```
   Container: 5879 → External: 443 (HTTPS)
   Access: https://your-domain.com/
   ```

---

## 🌐 SSL/HTTPS Setup (Optional)

### **Enable HTTPS in Dokploy:**

1. **In Dokploy Dashboard:**
   - Go to your application settings
   - Find "Domains" section
   - Add your domain: `yourdomain.com`

2. **Enable SSL:**
   - Toggle "Enable SSL" switch
   - Dokploy will automatically provision Let's Encrypt certificate

3. **DNS Configuration:**
   ```
   Type: A Record
   Name: @ (or subdomain)
   Value: Your Dokploy server IP
   TTL: 300
   ```

---

## 🎯 Dokploy Settings Summary

### **Required Settings:**

```yaml
Application Name: unioncore-mvp

# Build Settings
Build Method: Dockerfile
Dockerfile: ./Dockerfile
Context: .

# Port Configuration
Container Port: 5879
External Port: 80 (or 443 for HTTPS)

# Environment Variables
NODE_ENV=production
PORT=5879
HOST=0.0.0.0

# Resources (Recommended)
Memory Limit: 512MB
CPU Limit: 0.5 cores

# Health Check
Enabled: Yes
Path: /
Interval: 30s
```

---

## 📋 Pre-Deployment Checklist

- [ ] All code committed and pushed to GitHub
- [ ] `Dockerfile` includes `tailwind.config.js` and `postcss.config.js`
- [ ] `package.json` has Tailwind CSS v3.4.1
- [ ] Repository is accessible from Dokploy
- [ ] Domain DNS (if using custom domain) is configured
- [ ] Dokploy has GitHub access (if using GitHub deployment)

---

## 🔍 Verify Deployment

### **After deployment, check:**

1. **Application Health:**

   ```bash
   curl http://your-server-ip/
   # Should return HTML content
   ```

2. **CSS Loading:**

   ```bash
   curl -I http://your-server-ip/assets/index-*.css
   # Should return 200 OK
   ```

3. **Browser Test:**
   - Open `http://your-server-ip/` in browser
   - Dashboard should be fully styled with:
     - Blue buttons
     - Card layouts with shadows
     - Proper spacing and colors
     - Progress bars and charts

---

## 🐛 Troubleshooting

### **Issue: Blank screen after deployment**

**Solution:**

1. Check build logs in Dokploy
2. Verify Tailwind config files are copied:
   ```bash
   docker exec <container-id> ls -la /app/
   # Should show tailwind.config.js and postcss.config.js
   ```

### **Issue: CSS not loading**

**Solution:**

1. Check if CSS file exists in container:
   ```bash
   docker exec <container-id> ls -la /app/dist/public/assets/
   ```
2. Verify build completed successfully in logs

### **Issue: Port not accessible**

**Solution:**

1. Check Dokploy port mapping: Container `5879` → External `80`
2. Verify firewall allows traffic on external port
3. Check Docker container is running:
   ```bash
   docker ps | grep unioncore
   ```

---

## 📊 Resource Requirements

### **Minimum:**

- Memory: 256MB
- CPU: 0.25 cores
- Disk: 500MB

### **Recommended:**

- Memory: 512MB
- CPU: 0.5 cores
- Disk: 1GB

---

## 🔄 Update Deployment

### **To deploy updates:**

1. **Push code to GitHub:**

   ```bash
   git add -A
   git commit -m "Update application"
   git push origin main
   ```

2. **In Dokploy:**
   - Click "Redeploy" button
   - Dokploy will pull latest code and rebuild

---

## 💡 Tips

1. **Use Health Checks:** Enable health checks in Dokploy for automatic restarts
2. **Monitor Logs:** Check Dokploy logs if deployment fails
3. **Test Locally First:** Run `docker build -t unioncore .` locally to verify Dockerfile works
4. **Use HTTPS:** Always enable SSL for production deployments
5. **Backup Data:** Dokploy doesn't persist data by default - add volumes if needed

---

## 🎉 Success!

Your application should now be accessible at:

- **HTTP:** `http://your-server-ip/` or `http://your-domain.com/`
- **HTTPS:** `https://your-domain.com/` (if SSL configured)

**Expected Result:**
Fully styled dashboard with blue buttons, cards, charts, and all CSS working perfectly! 🎊

---

## 📞 Support

If you encounter issues:

1. Check Dokploy build logs
2. Verify port configuration (Container: 5879 → External: 80)
3. Test Docker build locally first
4. Ensure all config files are committed to Git

**Port Summary:**

- **Open in Dokploy:** External Port `80` (HTTP) or `443` (HTTPS)
- **Container Port:** `5879` (automatically configured)
- **Health Check:** Enabled on port `5879`
