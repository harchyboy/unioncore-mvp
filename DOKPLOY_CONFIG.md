# 🚀 Dokploy Configuration for UNION Core Plus

## Container Information

```yaml
Application Name: unioncore-mvp
Container Ports:  5879 (Vite), 80 (Nginx)
Domain:          union.hartz.ai
Protocol:        HTTP (SSL handled by Dokploy/Traefik)
```

---

## 🔧 Dokploy Dashboard Configuration

### Step-by-Step Setup

#### 1. Application Settings

Navigate to your Dokploy application settings and configure:

```yaml
General:
  Name: unioncore-mvp
  Image: <your-image> or Build from source
  
Network:
  Port: 80
  Protocol: HTTP
  
Domain:
  Domain: union.hartz.ai
  Path: /
  HTTPS: ✅ Enabled
  Let's Encrypt: ✅ Enabled
  Force HTTPS: ✅ Enabled (recommended)
  
Environment:
  NODE_ENV: production
  PORT: 5879
```

#### 2. Port Mapping

**Option A: Direct to Vite (Current Setup)**
```
Container Port: 5879
External: Managed by Dokploy
Protocol: HTTP
```

**Option B: Through Nginx (Alternative)**
```
Container Port: 80
External: Managed by Dokploy
Protocol: HTTP
```

#### 3. Domain Configuration

```
Primary Domain: union.hartz.ai
SSL/TLS: Let's Encrypt (Auto)
Force HTTPS: Yes
Certificate Renewal: Automatic
```

---

## 📋 Dokploy Traefik Labels

If Dokploy uses Docker labels for Traefik routing, add these:

```yaml
labels:
  # Enable Traefik
  - "traefik.enable=true"
  
  # HTTP Router
  - "traefik.http.routers.unioncore.rule=Host(`union.hartz.ai`)"
  - "traefik.http.routers.unioncore.entrypoints=web"
  
  # HTTPS Router
  - "traefik.http.routers.unioncore-secure.rule=Host(`union.hartz.ai`)"
  - "traefik.http.routers.unioncore-secure.entrypoints=websecure"
  - "traefik.http.routers.unioncore-secure.tls=true"
  - "traefik.http.routers.unioncore-secure.tls.certresolver=letsencrypt"
  
  # Redirect HTTP to HTTPS
  - "traefik.http.middlewares.redirect-to-https.redirectscheme.scheme=https"
  - "traefik.http.routers.unioncore.middlewares=redirect-to-https"
  
  # Service (point to correct port)
  - "traefik.http.services.unioncore.loadbalancer.server.port=80"
  # Or if using Vite directly:
  # - "traefik.http.services.unioncore.loadbalancer.server.port=5879"
```

---

## 🐳 Docker Compose for Dokploy

If Dokploy uses docker-compose, here's the configuration:

```yaml
version: '3.8'

services:
  unioncore-mvp:
    build: .
    container_name: unioncore-mvp
    restart: unless-stopped
    
    ports:
      - "5879:5879"
      - "80:80"
    
    environment:
      - NODE_ENV=production
      - PORT=5879
    
    networks:
      - dokploy-network
      - traefik-network
    
    labels:
      # Traefik configuration
      - "traefik.enable=true"
      - "traefik.docker.network=traefik-network"
      
      # HTTP entrypoint
      - "traefik.http.routers.unioncore.rule=Host(`union.hartz.ai`)"
      - "traefik.http.routers.unioncore.entrypoints=web"
      - "traefik.http.routers.unioncore.middlewares=redirect-to-https@docker"
      
      # HTTPS entrypoint
      - "traefik.http.routers.unioncore-secure.rule=Host(`union.hartz.ai`)"
      - "traefik.http.routers.unioncore-secure.entrypoints=websecure"
      - "traefik.http.routers.unioncore-secure.tls=true"
      - "traefik.http.routers.unioncore-secure.tls.certresolver=letsencrypt"
      
      # Service configuration (Nginx port)
      - "traefik.http.services.unioncore.loadbalancer.server.port=80"
      
      # Middleware for HTTPS redirect
      - "traefik.http.middlewares.redirect-to-https.redirectscheme.scheme=https"
      - "traefik.http.middlewares.redirect-to-https.redirectscheme.permanent=true"
    
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:80"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

networks:
  dokploy-network:
    external: true
  traefik-network:
    external: true
```

---

## 🌐 DNS Configuration

Ensure your DNS is pointing to the Dokploy server:

```bash
# A Record
union.hartz.ai  →  <DOKPLOY_SERVER_IP>

# Or CNAME (if using subdomain)
union.hartz.ai  →  your-dokploy-server.com
```

**Verify DNS:**
```bash
dig union.hartz.ai +short
# Should return: 65.21.77.45 (or your Dokploy server IP)
```

---

## ✅ Verification Checklist

After configuring in Dokploy:

- [ ] Domain added in Dokploy dashboard
- [ ] SSL/HTTPS enabled
- [ ] Let's Encrypt configured
- [ ] Port 80/5879 exposed from container
- [ ] DNS pointing to Dokploy server
- [ ] Certificate issued (check Dokploy logs)
- [ ] Site accessible via HTTPS
- [ ] HTTP redirects to HTTPS (if configured)
- [ ] Green padlock showing in browser
- [ ] Certificate issuer: Let's Encrypt

---

## 🔍 Testing SSL Setup

### 1. Check HTTP (should redirect to HTTPS)
```bash
curl -I http://union.hartz.ai
# Expected: 301/302 redirect to https://
```

### 2. Check HTTPS
```bash
curl -I https://union.hartz.ai
# Expected: 200 OK with SSL
```

### 3. Test Certificate
```bash
echo | openssl s_client -connect union.hartz.ai:443 -servername union.hartz.ai 2>/dev/null | openssl x509 -noout -text | grep -E "Issuer|Not After"
# Expected: Issuer: Let's Encrypt, Valid date
```

### 4. Browser Test
```
Visit: https://union.hartz.ai
Check: Green padlock icon
Click: View certificate details
Verify: Let's Encrypt issuer
```

---

## 🐛 Troubleshooting

### Issue: Dokploy not issuing certificate

**Check Dokploy logs:**
```bash
# On Dokploy host
docker logs dokploy
docker logs traefik

# Look for:
# - ACME challenge errors
# - Let's Encrypt rate limits
# - DNS resolution issues
```

**Common causes:**
1. Port 80 not accessible from internet
2. DNS not propagated yet (wait 10-15 minutes)
3. Let's Encrypt rate limit (5 certs per domain per week)
4. Firewall blocking port 80

### Issue: 404 on all requests

**Check Dokploy routing:**
```bash
# View Traefik configuration
docker exec traefik cat /etc/traefik/traefik.yml

# Check if router is registered
docker exec traefik traefik healthcheck
```

**Fix:**
- Ensure domain is correctly configured in Dokploy
- Verify port mapping (80 or 5879)
- Check Traefik labels are applied

### Issue: Certificate valid but site not loading

**Check container health:**
```bash
# Inside container
curl http://localhost:80
curl http://localhost:5879

# Check if services are running
pm2 status
ps aux | grep nginx
```

### Issue: Mixed content warnings

**Fix nginx configuration:**
```nginx
# Update proxy settings to trust X-Forwarded-Proto
location / {
    proxy_set_header X-Forwarded-Proto $http_x_forwarded_proto;
    # ... other settings
}
```

---

## 📊 Monitoring

### Check Certificate Expiry

```bash
# From anywhere
echo | openssl s_client -connect union.hartz.ai:443 2>/dev/null | openssl x509 -noout -dates

# Output example:
# notBefore=Oct 23 10:00:00 2025 GMT
# notAfter=Jan 21 10:00:00 2026 GMT
```

### Monitor Auto-Renewal

Dokploy/Traefik checks daily and renews 30 days before expiry:
- **No action needed**
- Check Dokploy logs weekly to ensure no errors

---

## 🎯 Current Application Status

```
✅ Vite:     Running on port 5879
✅ Nginx:    Running on port 80
✅ PM2:      Managing process with auto-restart
✅ Ports:    80 and 5879 exposed
✅ Ready:    For Dokploy SSL configuration
```

---

## 📚 Additional Dokploy Resources

- **Port Configuration**: Use port 80 or 5879 depending on your preference
- **Environment Variables**: Set in Dokploy dashboard
- **Health Checks**: Configured in docker-compose
- **Scaling**: Can add more instances through Dokploy

---

## 🎉 Final Steps

1. **Login to Dokploy Dashboard**
2. **Navigate to unioncore-mvp application**
3. **Add domain: `union.hartz.ai`**
4. **Enable SSL/HTTPS toggle**
5. **Save and wait 60 seconds**
6. **Visit: https://union.hartz.ai**
7. **Verify green padlock** ✅

---

**Your container is ready! Just enable SSL in Dokploy dashboard.**

The application is already configured to work behind Dokploy's SSL-terminating proxy. Dokploy will handle:
- ✅ SSL certificate issuance
- ✅ Certificate renewal
- ✅ HTTP to HTTPS redirect
- ✅ TLS termination
- ✅ Routing to your container

**No additional configuration needed inside the container!**
