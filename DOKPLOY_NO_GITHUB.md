# 🚀 Deploy to Dokploy WITHOUT GitHub Integration

## Problem Solved ✅

Your GitHub account in Dokploy is different from the repository account (harchyboy), so you can't use GitHub integration directly.

**Solution:** Deploy using Docker Compose that builds from the public repository URL without needing GitHub authentication!

---

## 📦 Three Methods to Deploy Without GitHub Auth

### Method 1: Use Pre-built Docker Image (Easiest) ⭐

If you can push to Docker Hub or build locally first.

### Method 2: Docker Compose with Public GitHub URL (Recommended) ✅

Build directly from public GitHub - no auth needed!

### Method 3: Upload Complete Package to Dokploy 📤

Upload all files as a zip and build locally in Dokploy.

---

## 🎯 Method 2: Docker Compose from Public GitHub (RECOMMENDED)

This is the EASIEST method if your repo is public!

### Step 1: Download the Docker Compose File

Download this file from your repository:

```
docker-compose.github-public.yml
```

Or create a new file with this content:

```yaml
version: "3.8"

services:
  unioncore-app:
    # Builds directly from public GitHub - NO AUTH NEEDED!
    build:
      context: https://github.com/harchyboy/unioncore-mvp.git#unzip-application
      dockerfile: Dockerfile

    image: unioncore-mvp:latest
    container_name: unioncore-mvp
    restart: unless-stopped

    ports:
      - "80:80"
      - "5879:5879"

    environment:
      - NODE_ENV=production
      - PORT=5879
      - VITE_HOST=0.0.0.0

    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:80"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

    networks:
      - traefik-public

    labels:
      - "traefik.enable=true"
      - "traefik.docker.network=traefik-public"
      - "traefik.http.routers.unioncore.rule=Host(`union.hartz.ai`)"
      - "traefik.http.routers.unioncore.entrypoints=web"
      - "traefik.http.routers.unioncore-secure.rule=Host(`union.hartz.ai`)"
      - "traefik.http.routers.unioncore-secure.entrypoints=websecure"
      - "traefik.http.routers.unioncore-secure.tls=true"
      - "traefik.http.routers.unioncore-secure.tls.certresolver=letsencrypt"
      - "traefik.http.services.unioncore.loadbalancer.server.port=80"

networks:
  traefik-public:
    external: true
```

### Step 2: Upload to Dokploy

1. Access Dokploy dashboard
2. Create new project: "unioncore"
3. Click "Add Application"
4. Select: **"Docker Compose"**
5. Upload the file: `docker-compose.github-public.yml`
6. Click **"Deploy"**

### Step 3: Wait for Build

Docker will:

1. ✅ Clone from https://github.com/harchyboy/unioncore-mvp.git
2. ✅ Checkout branch: unzip-application
3. ✅ Build the Dockerfile
4. ✅ Start the container
5. ✅ Configure Traefik routing
6. ✅ Request SSL certificate

This takes 3-5 minutes.

### Step 4: Verify

Visit: https://union.hartz.ai

Expected: ✅ Your app with green padlock!

---

## 🎯 Method 3: All-in-One Dockerfile (Alternative)

If Method 2 doesn't work, use a Dockerfile that clones the repo.

### Step 1: Create Dockerfile

Create a file named `Dockerfile` with this content:

```dockerfile
# Build stage - clone from GitHub
FROM node:20-alpine AS builder

# Install git
RUN apk add --no-cache git

# Clone the public repository
WORKDIR /tmp
RUN git clone --depth 1 --branch unzip-application \
    https://github.com/harchyboy/unioncore-mvp.git app

# Install dependencies
WORKDIR /tmp/app
RUN npm install

# Production stage
FROM node:20-alpine

# Install runtime dependencies
RUN apk add --no-cache nginx curl bash && \
    npm install -g pm2

# Copy application
WORKDIR /app
COPY --from=builder /tmp/app /app

# Configure Nginx
RUN mkdir -p /var/log/unioncore && \
    echo 'server { \
        listen 80; \
        server_name _; \
        location / { \
            proxy_pass http://127.0.0.1:5879; \
            proxy_http_version 1.1; \
            proxy_set_header Upgrade $http_upgrade; \
            proxy_set_header Connection "upgrade"; \
            proxy_set_header Host $host; \
            proxy_set_header X-Real-IP $remote_addr; \
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; \
            proxy_set_header X-Forwarded-Proto $scheme; \
        } \
    }' > /etc/nginx/http.d/default.conf

# Create PM2 config if doesn't exist
RUN if [ ! -f /app/ecosystem.config.cjs ]; then \
        echo "module.exports = { \
            apps: [{ \
                name: 'unioncore-mvp', \
                script: 'npm', \
                args: 'run dev', \
                cwd: '/app/client', \
                autorestart: true, \
                env: { NODE_ENV: 'production', PORT: 5879, HOST: '0.0.0.0' } \
            }] \
        }" > /app/ecosystem.config.cjs; \
    fi

# Create startup script
RUN echo '#!/bin/bash\nnginx\ncd /app && pm2-runtime start ecosystem.config.cjs' \
    > /app/start.sh && chmod +x /app/start.sh

EXPOSE 80 5879

HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD curl -f http://localhost:80 || exit 1

CMD ["/app/start.sh"]
```

### Step 2: Create docker-compose.yml

```yaml
version: "3.8"

services:
  unioncore:
    build:
      context: .
      dockerfile: Dockerfile

    container_name: unioncore-mvp
    restart: unless-stopped

    ports:
      - "80:80"
      - "5879:5879"

    environment:
      - NODE_ENV=production
      - PORT=5879

    networks:
      - traefik-public

    labels:
      - "traefik.enable=true"
      - "traefik.docker.network=traefik-public"
      - "traefik.http.routers.unioncore.rule=Host(`union.hartz.ai`)"
      - "traefik.http.routers.unioncore.entrypoints=web"
      - "traefik.http.routers.unioncore-secure.rule=Host(`union.hartz.ai`)"
      - "traefik.http.routers.unioncore-secure.entrypoints=websecure"
      - "traefik.http.routers.unioncore-secure.tls=true"
      - "traefik.http.routers.unioncore-secure.tls.certresolver=letsencrypt"
      - "traefik.http.services.unioncore.loadbalancer.server.port=80"

networks:
  traefik-public:
    external: true
```

### Step 3: Upload Both Files to Dokploy

1. Create a folder with both files:

   ```
   unioncore-deploy/
   ├── Dockerfile
   └── docker-compose.yml
   ```

2. Zip the folder: `unioncore-deploy.zip`

3. In Dokploy:
   - Create new application
   - Select "Upload Project"
   - Upload the zip file
   - Click "Deploy"

---

## 🎯 Method 1: Use Docker Hub (Professional)

If you want the fastest deploys, push to Docker Hub first.

### Step 1: Build and Push to Docker Hub

On your local machine or in CI/CD:

```bash
# Clone repository
git clone https://github.com/harchyboy/unioncore-mvp.git
cd unioncore-mvp
git checkout unzip-application

# Build image
docker build -t yourusername/unioncore-mvp:latest .

# Push to Docker Hub (requires docker login)
docker push yourusername/unioncore-mvp:latest
```

### Step 2: Simple docker-compose for Dokploy

```yaml
version: "3.8"

services:
  unioncore:
    # Use pre-built image from Docker Hub
    image: yourusername/unioncore-mvp:latest

    container_name: unioncore-mvp
    restart: unless-stopped

    ports:
      - "80:80"
      - "5879:5879"

    environment:
      - NODE_ENV=production

    networks:
      - traefik-public

    labels:
      - "traefik.enable=true"
      - "traefik.docker.network=traefik-public"
      - "traefik.http.routers.unioncore.rule=Host(`union.hartz.ai`)"
      - "traefik.http.routers.unioncore.entrypoints=web"
      - "traefik.http.routers.unioncore-secure.rule=Host(`union.hartz.ai`)"
      - "traefik.http.routers.unioncore-secure.entrypoints=websecure"
      - "traefik.http.routers.unioncore-secure.tls=true"
      - "traefik.http.routers.unioncore-secure.tls.certresolver=letsencrypt"
      - "traefik.http.services.unioncore.loadbalancer.server.port=80"

networks:
  traefik-public:
    external: true
```

### Step 3: Deploy in Dokploy

Upload this docker-compose.yml to Dokploy and deploy!

**Benefit:** Super fast deploys (no build time), images are cached.

---

## ✅ Which Method to Use?

### Use Method 2 (GitHub URL) if:

- ✅ Your repository is public
- ✅ You want automatic updates from GitHub
- ✅ You don't have Docker Hub access
- ⭐ **RECOMMENDED for most users**

### Use Method 3 (All-in-One) if:

- ✅ Method 2 doesn't work
- ✅ You want everything self-contained
- ✅ You can upload files to Dokploy

### Use Method 1 (Docker Hub) if:

- ✅ You want fastest deploys
- ✅ You have CI/CD pipeline
- ✅ You want versioning

---

## 🔍 Troubleshooting

### Issue: "git: command not found" during build

**Solution:** The Dockerfile installs git, but if it fails:

```dockerfile
# Add this line early in Dockerfile
RUN apk add --no-cache git curl bash
```

### Issue: "repository not found" when cloning

**Possible causes:**

1. Repository is private (make it public)
2. Branch name wrong (check it's "unzip-application")
3. URL typo

**Test if repository is public:**

```bash
git clone https://github.com/harchyboy/unioncore-mvp.git
# Should work without authentication
```

### Issue: Build takes forever

**Normal build time:** 3-5 minutes

**If longer:**

- Check Dokploy logs for errors
- Network issues
- Large dependencies (node_modules is big)

**Speed up builds:**

- Use Method 1 (Docker Hub)
- Enable BuildKit: `DOCKER_BUILDKIT=1`

### Issue: Container starts but 404 error

**This means domain not configured!**

Follow these steps:

1. Go to Dokploy application settings
2. Find "Domains" tab
3. Add domain: union.hartz.ai → Port 80
4. Enable HTTPS + Let's Encrypt
5. Save and wait 60 seconds

---

## 📊 What Happens During Deploy

### Build Process:

```
1. Dokploy receives docker-compose.yml
   └─ Parses configuration

2. Docker starts build
   ├─ Stage 1: Builder
   │   ├─ Pull node:20-alpine image
   │   ├─ Install git
   │   ├─ Clone GitHub repository
   │   ├─ Install npm dependencies
   │   └─ Build complete
   │
   └─ Stage 2: Production
       ├─ Pull fresh node:20-alpine
       ├─ Install nginx, pm2
       ├─ Copy app from builder
       ├─ Configure nginx
       └─ Set up startup script

3. Container starts
   ├─ Run startup script
   ├─ Start nginx (port 80)
   ├─ Start PM2 with Vite (port 5879)
   └─ Health check passes

4. Traefik configuration
   ├─ Read labels from container
   ├─ Create route: union.hartz.ai → container:80
   ├─ Request Let's Encrypt certificate
   └─ Enable HTTPS

5. Ready! 🎉
   └─ https://union.hartz.ai is live
```

---

## 📋 Quick Start Checklist

### Before You Start:

- [ ] Repository is public on GitHub
- [ ] Branch "unzip-application" exists
- [ ] Dockerfile exists in repository
- [ ] Dokploy dashboard accessible

### Deploy Steps:

- [ ] Download docker-compose.github-public.yml
- [ ] Access Dokploy dashboard
- [ ] Create project "unioncore"
- [ ] Add application → Docker Compose
- [ ] Upload docker-compose file
- [ ] Click Deploy
- [ ] Wait 3-5 minutes
- [ ] Check deployment logs for errors

### After Deploy:

- [ ] Container status: Running
- [ ] Visit http://union.hartz.ai (should work)
- [ ] Configure domain for HTTPS (see domains tab)
- [ ] Visit https://union.hartz.ai
- [ ] Check SSL certificate (green padlock)
- [ ] Done! 🎉

---

## 🎯 Recommended: Method 2 Step-by-Step

### Exact Steps:

1. **Download file from your repository:**

   ```
   https://github.com/harchyboy/unioncore-mvp/blob/unzip-application/docker-compose.github-public.yml
   ```

   Right-click → Save As → `docker-compose.yml`

2. **Access Dokploy:**
   Try these URLs:
   - https://dokploy.hartz.ai
   - http://65.21.77.45:3000

3. **Create Project:**
   - Click "New Project"
   - Name: unioncore
   - Click "Create"

4. **Add Application:**
   - Inside project, click "Add Application"
   - Type: Docker Compose
   - Upload: docker-compose.yml
   - Click "Create"

5. **Deploy:**
   - Click "Deploy" button
   - Watch logs for progress
   - Wait 3-5 minutes

6. **Configure Domain:**
   - Go to "Domains" tab
   - Click "+ Add Domain"
   - Domain: union.hartz.ai
   - Port: 80
   - Enable HTTPS: ☑
   - Let's Encrypt: ☑
   - Click "Save"

7. **Test:**
   - Wait 60 seconds
   - Visit: https://union.hartz.ai
   - Should work! ✅

---

## 💡 Pro Tips

1. **Make repo public temporarily** if it's private
2. **Check build logs** if something fails
3. **Traefik network** must exist (Dokploy creates it)
4. **Port 80** must be accessible from container
5. **DNS must point** to Dokploy server

---

## 📞 Need More Help?

If you're still stuck, provide:

- Screenshot of Dokploy interface
- Build logs from Dokploy
- Error messages

And I can give you exact instructions!

---

**Summary:** Use `docker-compose.github-public.yml` - it builds directly from your public GitHub repo without needing GitHub integration in Dokploy! 🚀
