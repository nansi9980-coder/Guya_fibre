# Deployment Guide - GUYA FIBRE

## 🌐 Plateformes de Déploiement Supportées

### 1. Vercel (Recommandé)

Vercel est l'optimum pour Next.js apps. Configuration automatique.

#### Setup Vercel

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Deploy
vercel

# 3. Configure environment in Vercel Dashboard
# Settings > Environment Variables
```

#### Environment Variables pour Production

```env
NEXT_PUBLIC_API_URL=https://api.guyafibre.com
NEXT_PUBLIC_SITE_URL=https://guyafibre.com
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ANALYTICS_ID=G-XXXXXXXXXX
```

#### Auto-deployment

```yaml
# vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "env": {
    "NEXT_PUBLIC_API_URL": "@api_url"
  }
}
```

---

### 2. Docker (Self-Hosted)

Pour déployer sur vos propres serveurs.

#### Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Build
COPY . .
RUN npm run build

# Run
EXPOSE 3000
CMD ["npm", "start"]
```

#### Docker Compose

```yaml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      NEXT_PUBLIC_API_URL: http://api:3001
    depends_on:
      - api
  
  api:
    image: your-api:latest
    ports:
      - "3001:3001"
```

#### Build & Run

```bash
# Build image
docker build -t guyafibre:latest .

# Run container
docker run -p 3000:3000 -e NEXT_PUBLIC_API_URL=... guyafibre:latest

# Or with compose
docker-compose up -d
```

---

### 3. AWS/Azure/GCP

#### AWS (EC2 + S3)

```bash
# 1. Build
npm run build

# 2. Upload to S3
aws s3 sync .next s3://my-bucket/next

# 3. CloudFront invalidation
aws cloudfront create-invalidation --distribution-id ... --paths "/*"

# Or use EC2 with PM2
npm install -g pm2
pm2 start "npm start" --name "guyafibre"
pm2 startup
```

#### Azure App Service

```bash
# 1. Create app
az appservice plan create --name guyafibre --resource-group mygroup --sku B1 --is-linux

# 2. Create web app
az webapp create --resource-group mygroup --plan guyafibre --name guyafibre-app --runtime "NODE|18-lts"

# 3. Deploy
git push azure main
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run lint

  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build

  deploy:
    needs: [lint, build]
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: vercel/action@main
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

---

## 📋 Pre-Deployment Checklist

### Code Quality
- [ ] `npm run lint` passes
- [ ] TypeScript compilation OK
- [ ] No console.log/debug statements
- [ ] All tests pass

### Performance
- [ ] Lighthouse > 75
- [ ] Images optimized
- [ ] No unused dependencies
- [ ] Code splitting optimized

### SEO/Content
- [ ] Meta tags correct
- [ ] Sitemap updated
- [ ] robots.txt OK
- [ ] Open Graph images OK

### Security
- [ ] No hardcoded secrets
- [ ] Environment variables set
- [ ] SSL certificate valid
- [ ] Security headers configured

### Analytics/Monitoring
- [ ] Analytics script added
- [ ] Error tracking setup (Sentry)
- [ ] Performance monitoring setup
- [ ] Logging configured

---

## 🚀 Deployment Steps

### 1. Pre-Deployment

```bash
# Update dependencies
npm update

# Check for vulnerabilities
npm audit

# Run linting
npm run lint

# Build locally
npm run build

# Test production build
npm start
```

### 2. Update Environment

```bash
# Copy from example
cp .env.example .env.local

# Update values for production
NEXT_PUBLIC_API_URL=https://api.guyafibre.com
NEXT_PUBLIC_SITE_URL=https://guyafibre.com
```

### 3. Commit & Push

```bash
git add .
git commit -m "chore: prepare for deployment"
git push origin main
```

### 4. Deploy

**Vercel:**
```bash
vercel --prod
```

**Docker:**
```bash
docker build -t guyafibre:latest .
docker push registry.com/guyafibre:latest
# Pull on server and restart
```

### 5. Post-Deployment Verification

```bash
# Check site loads
curl https://guyafibre.com

# Check security headers
curl -I https://guyafibre.com

# Monitor logs
vercel logs --tail

# Check analytics
# Visit Vercel dashboard or Google Analytics
```

---

## 🔍 Monitoring Post-Deploy

### Health Checks

```bash
# Website up?
https://guyafibre.com

# API working?
https://api.guyafibre.com/health

# Performance OK?
https://guyafibre.com/api/health
```

### Key Metrics

Monitor these in production:

1. **Page Load Time** - Target: < 2s
2. **Error Rate** - Target: < 0.1%
3. **API Response Time** - Target: < 200ms
4. **Server Uptime** - Target: > 99.9%
5. **Database Performance** - Target: < 100ms

### Dashboards

- Vercel: https://vercel.com/dashboard
- Google Analytics: https://analytics.google.com
- Sentry: https://sentry.io (if configured)
- Uptime Monitor: https://uptimerobot.com

---

## 🔄 Rollback Procedure

If deployment fails:

### Vercel
```bash
# View deployment history
vercel deployments

# Rollback to previous version
vercel rollback
```

### Docker
```bash
# Check image history
docker images

# Run previous version
docker run -p 3000:3000 guyafibre:v1.0.0
```

### Git
```bash
# Revert last commit
git revert HEAD

# Force push (last resort)
git reset --hard HEAD~1
git push --force
```

---

## 📞 Support & Troubleshooting

### Common Issues

**502 Bad Gateway**
- Check if server is running
- Check environment variables
- Check API connectivity

**High memory usage**
- Restart container
- Check for memory leaks
- Review error logs

**Slow performance**
- Check database query logs
- Run Lighthouse audit
- Check cache configuration

**Failed deployment**
- Check build logs
- Verify environment variables
- Test build locally first

### Logs & Debugging

```bash
# Vercel logs
vercel logs --follow

# Docker logs
docker logs container-id

# SSH into server
ssh user@server.com
tail -f /var/log/app.log
```

---

## 🔒 Security in Production

### SSL/HTTPS
- Enabled by default on Vercel ✅
- Configure auto-renewal
- Test with: https://www.ssllabs.com

### Headers
```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000; includeSubDomains
Content-Security-Policy: default-src 'self'
```

### Firewall Rules
- Block known bad IPs
- Rate limit API endpoints
- Whitelist admin IPs

---

## 📚 Resources

- [Vercel Docs](https://vercel.com/docs)
- [Docker Docs](https://docs.docker.com)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Security Best Practices](https://owasp.org/Top10)

---

**Last Updated:** 2026
