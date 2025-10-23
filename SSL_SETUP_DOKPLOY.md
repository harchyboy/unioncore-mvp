# 🔐 SSL Setup for UNION Core Plus on Dokploy

## Important: SSL Configuration for Dokploy

Since this application is running on **Dokploy**, SSL/TLS certificates should be configured through Dokploy's dashboard, **not inside the container**. Dokploy uses Traefik as its reverse proxy and handles Let's Encrypt SSL certificates automatically.

---

## 🎯 Quick Setup (Recommended)

### Step 1: Access Dokploy Dashboard

1. Log in to your Dokploy dashboard
2. Navigate to your `unioncore-mvp` application
3. Go to the **Domain** or **Settings** section

### Step 2: Configure Domain with SSL

1. **Add Domain**: 
   - Enter `union.hartz.ai` as your domain
   - Click "Add Domain" or "Save"

2. **Enable SSL**:
   - Look for "Enable HTTPS" or "SSL/TLS" toggle
   - Enable it (this activates automatic Let's Encrypt)

3. **Force HTTPS** (Optional):
   - Enable "Redirect HTTP to HTTPS" if available
   - This will automatically redirect all HTTP traffic to HTTPS

### Step 3: Wait for Certificate

- Dokploy will automatically request a Let's Encrypt certificate
- This usually takes 30-60 seconds
- Certificate is automatically renewed every 90 days

### Step 4: Verify SSL

Visit your site:
```
https://union.hartz.ai
```

Check the certificate:
- Click the padlock icon in your browser
- Verify it shows "Let's Encrypt" as the issuer

---

## 🏗️ How Dokploy SSL Works

```
Internet
    ↓
DNS (union.hartz.ai → Dokploy Server IP)
    ↓
Dokploy Traefik Proxy (Port 443)
    │
    ├─ Handles SSL/TLS termination
    ├─ Manages Let's Encrypt certificates
    ├─ Auto-renewal every 90 days
    └─ Forwards to container
         ↓
    Container (Your App)
         ↓
    Nginx (Port 80 inside container)
         ↓
    Vite (Port 5879)
```

**Key Points:**
- SSL termination happens at Dokploy's Traefik proxy
- Your container only needs to serve HTTP (port 80/5879)
- Traefik automatically handles HTTPS and certificate renewal
- No certbot needed inside the container

---

## 📋 Dokploy Dashboard Steps (Detailed)

### Method 1: Using Dokploy UI (Easiest)

1. **Login to Dokploy**
   ```
   https://your-dokploy-instance.com
   ```

2. **Select Your Application**
   - Find "unioncore-mvp" or your app name
   - Click to open settings

3. **Navigate to Domains**
   - Look for "Domains", "Routing", or "Network" tab
   - You should see domain configuration options

4. **Add/Edit Domain**
   ```
   Domain:     union.hartz.ai
   Port:       5879 (or 80 if using nginx proxy)
   Protocol:   HTTP (inside container)
   Path:       / (root)
   ```

5. **Enable SSL/TLS**
   - Toggle "Enable HTTPS" or "SSL"
   - Select "Let's Encrypt" as provider
   - Optionally enable "Force HTTPS"

6. **Save Configuration**
   - Click "Save" or "Apply"
   - Wait 30-60 seconds for certificate

### Method 2: Using Dokploy Configuration File

If Dokploy uses a configuration file (like `dokploy.yaml`):

```yaml
services:
  unioncore-mvp:
    domains:
      - domain: union.hartz.ai
        https: true
        letsencrypt: true
        forceHttps: true
        targetPort: 5879
```

---

## 🔧 Container Configuration for SSL-Terminating Proxy

Your container is **already correctly configured** to work behind Dokploy's SSL proxy:

### Current Setup ✅
- Vite running on port **5879** (HTTP)
- Nginx proxying on port **80** (HTTP inside container)
- Dokploy maps external 443 → internal 80/5879

### Nginx Headers (Already Configured) ✅
```nginx
proxy_set_header X-Forwarded-Proto $scheme;
proxy_set_header X-Forwarded-Host $host;
proxy_set_header X-Real-IP $remote_addr;
```

These headers ensure your app knows:
- The original protocol was HTTPS
- The original host was union.hartz.ai
- The real client IP address

---

## 🚀 Expose the Correct Port in Dokploy

Make sure Dokploy is configured to route to the correct port:

### Option 1: Direct to Vite (Recommended)
```
Container Port:  5879
Protocol:        HTTP
External Port:   80 (HTTP) and 443 (HTTPS via Traefik)
```

### Option 2: Through Nginx
```
Container Port:  80
Protocol:        HTTP
External Port:   80 (HTTP) and 443 (HTTPS via Traefik)
```

---

## 🔍 Troubleshooting

### Issue: Domain Shows "Not Secure"

**Check:**
1. Is SSL enabled in Dokploy dashboard?
2. Has the certificate been issued? (Check Dokploy logs)
3. Is DNS properly pointing to the server?

**Solution:**
```bash
# From Dokploy host (not container), check Traefik logs
docker logs traefik

# Look for Let's Encrypt certificate requests
grep -i "letsencrypt\|acme" /var/log/traefik/traefik.log
```

### Issue: Certificate Not Issued

**Reasons:**
1. **DNS not propagated**: Wait 5-10 minutes
2. **Port 80 not accessible**: Traefik needs port 80 for HTTP-01 challenge
3. **Rate limit**: Let's Encrypt has rate limits (5 certs per domain per week)

**Check DNS:**
```bash
nslookup union.hartz.ai
dig union.hartz.ai

# Expected: Should return your Dokploy server IP
```

**Check Port 80:**
```bash
curl -I http://union.hartz.ai
# Should return 200 or 301/302 redirect to HTTPS
```

### Issue: 404 on /.well-known/acme-challenge/

**This is normal when running on Dokploy!**

- The challenge happens at the Traefik level
- Traefik intercepts `/.well-known/acme-challenge/*` requests
- Your container never sees these requests
- Don't try to configure certbot inside the container

### Issue: Mixed Content Warnings

If your app loads but shows mixed content warnings:

**Solution:** Update your nginx config to respect `X-Forwarded-Proto`:

```nginx
# Add this to your location / block
if ($http_x_forwarded_proto = "https") {
    add_header Strict-Transport-Security "max-age=31536000" always;
}
```

---

## 📊 Verify SSL Configuration

### Test SSL Certificate

```bash
# Check SSL certificate details
openssl s_client -connect union.hartz.ai:443 -servername union.hartz.ai < /dev/null

# Quick SSL test
curl -I https://union.hartz.ai

# Should return:
# HTTP/2 200
# server: traefik or similar
```

### Check SSL Grade

Use online tools:
- **SSL Labs**: https://www.ssllabs.com/ssltest/analyze.html?d=union.hartz.ai
- **Why No Padlock**: https://www.whynopadlock.com/

### Verify Certificate Details

In browser:
1. Visit https://union.hartz.ai
2. Click padlock icon → "Certificate"
3. Check:
   - **Issuer**: Let's Encrypt
   - **Valid From**: Recent date
   - **Valid To**: ~90 days from issuance
   - **Subject**: union.hartz.ai

---

## 🔄 Certificate Renewal

**Good news:** Dokploy/Traefik handles renewal automatically!

- Certificates are checked daily
- Auto-renewed 30 days before expiration
- No manual intervention required
- Zero downtime during renewal

**Monitor Renewal:**
```bash
# Check Traefik logs for renewal events
docker logs traefik | grep -i renew
```

---

## 🛡️ Security Best Practices

### 1. Force HTTPS

Enable in Dokploy to redirect all HTTP → HTTPS:
```yaml
forceHttps: true
```

### 2. HSTS (HTTP Strict Transport Security)

Already configured in nginx:
```nginx
add_header Strict-Transport-Security "max-age=31536000" always;
```

### 3. Security Headers

Already configured:
```nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
```

### 4. Update Dependencies

Keep Dokploy and Traefik updated:
```bash
# On Dokploy host
dokploy update
```

---

## 📝 Alternative: Manual SSL (Not Recommended for Dokploy)

If for some reason you **cannot use Dokploy's built-in SSL**, you could:

1. **Get certificate outside container**:
   ```bash
   # On Dokploy host (not in container)
   certbot certonly --standalone -d union.hartz.ai
   ```

2. **Mount certificate into container**:
   ```yaml
   volumes:
     - /etc/letsencrypt:/etc/letsencrypt:ro
   ```

3. **Update nginx to use certificates**:
   ```nginx
   ssl_certificate /etc/letsencrypt/live/union.hartz.ai/fullchain.pem;
   ssl_certificate_key /etc/letsencrypt/live/union.hartz.ai/privkey.pem;
   ```

**But this is NOT recommended!** Let Dokploy handle it.

---

## 🎯 Summary: What to Do

### ✅ Do This:

1. **Open Dokploy Dashboard**
2. **Find your unioncore-mvp application**
3. **Add domain**: `union.hartz.ai`
4. **Enable SSL/HTTPS** (toggle or checkbox)
5. **Enable "Force HTTPS"** (optional but recommended)
6. **Save and wait 60 seconds**
7. **Visit**: https://union.hartz.ai

### ❌ Don't Do This:

1. ~~Install certbot inside container~~
2. ~~Configure SSL in nginx inside container~~
3. ~~Manually request certificates~~
4. ~~Expose port 443 from container~~

---

## 📞 Need Help?

### Dokploy Support

- **Documentation**: https://docs.dokploy.com
- **Discord**: Dokploy community server
- **GitHub**: https://github.com/Dokploy/dokploy

### Common Dokploy Commands

```bash
# Restart application
dokploy restart unioncore-mvp

# View logs
dokploy logs unioncore-mvp

# Check SSL status
dokploy ssl status union.hartz.ai

# Force SSL renewal
dokploy ssl renew union.hartz.ai
```

*(Note: Actual commands may vary based on Dokploy version)*

---

## 🎉 Expected Result

Once SSL is enabled through Dokploy:

```
✅ https://union.hartz.ai → Shows green padlock
✅ Certificate issuer: Let's Encrypt
✅ Valid for 90 days
✅ Auto-renewal configured
✅ HTTP → HTTPS redirect (if enabled)
✅ All traffic encrypted with TLS 1.2/1.3
```

---

## 📚 Additional Resources

- **Let's Encrypt Docs**: https://letsencrypt.org/docs/
- **Traefik SSL Docs**: https://doc.traefik.io/traefik/https/acme/
- **SSL Configuration Guide**: https://ssl-config.mozilla.org/

---

**Last Updated**: 2025-10-22  
**For**: UNION Core Plus MVP on Dokploy  
**Status**: Container ready for SSL-terminating proxy ✅

**Your app is already correctly configured to work behind Dokploy's SSL proxy. Just enable SSL in the Dokploy dashboard!**
