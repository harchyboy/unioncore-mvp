# 🚀 Quick Deployment Reference - UNION Core Plus

## 📦 Dokploy Deployment (Fastest)

### **Port Configuration:**

```
Container Port: 5879
External Port: 80 (or 443 for HTTPS)
```

### **Settings in Dokploy:**

1. **Application Name:** `unioncore-mvp`
2. **Build Method:** Dockerfile
3. **Dockerfile Path:** `./Dockerfile`
4. **Context:** `.`
5. **Port Mapping:** `5879:80` (or `5879:443` for HTTPS)

### **Environment Variables:**

```bash
NODE_ENV=production
PORT=5879
HOST=0.0.0.0
```

---

## 🐳 Docker Commands

### **Build and Run Locally:**

```bash
# Build image
docker build -t unioncore-mvp .

# Run container
docker run -d -p 80:5879 --name unioncore unioncore-mvp

# Check logs
docker logs unioncore

# Stop container
docker stop unioncore
```

### **Using Docker Compose:**

```bash
# Start
docker-compose up -d

# Stop
docker-compose down

# View logs
docker-compose logs -f

# Rebuild
docker-compose up -d --build
```

---

## 🌐 Access URLs

| Deployment Type      | URL                      |
| -------------------- | ------------------------ |
| **Local Docker**     | http://localhost:5879    |
| **Dokploy (HTTP)**   | http://your-server-ip/   |
| **Dokploy (Domain)** | http://your-domain.com/  |
| **Dokploy (HTTPS)**  | https://your-domain.com/ |

---

## ✅ Verify Deployment

```bash
# Check if app responds
curl http://your-server-ip/

# Check CSS loads
curl -I http://your-server-ip/assets/index-*.css
```

**Expected:** Fully styled dashboard with colors, buttons, and proper layout! 🎨

---

## 🔧 Troubleshooting

| Issue                   | Solution                                              |
| ----------------------- | ----------------------------------------------------- |
| **Blank screen**        | Check build logs, verify Tailwind config files copied |
| **Port not accessible** | Verify port mapping: `5879:80` in Dokploy             |
| **CSS not loading**     | Check `/app/dist/public/assets/` in container         |
| **Build fails**         | Run `docker build .` locally to debug                 |

---

## 📊 Quick Facts

- **Application Port:** 5879 (internal)
- **External Port:** 80 (HTTP) or 443 (HTTPS)
- **Health Check:** Enabled on `/`
- **CSS Framework:** Tailwind CSS v3.4.1 (stable)
- **Node Version:** 20 (Alpine)
- **Memory:** 512MB recommended

---

## 🎯 One-Command Deploy

### **Dokploy:**

1. Create app → Connect GitHub → Click Deploy ✅

### **Docker:**

```bash
docker-compose up -d
```

**That's it! 🎉**
