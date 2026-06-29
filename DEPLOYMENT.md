# YUVA'S SCHOOL - Deployment Guide

## 🚀 Deployment Options

### Option 1: Deploy to Heroku

**Prerequisites:**
- Heroku CLI installed
- Heroku account

**Steps:**

1. **Create Heroku App**
```bash
heroku create yuvas-school-backend
```

2. **Set Environment Variables**
```bash
heroku config:set EMAIL_USER=yuvasriram2909@gmail.com
heroku config:set EMAIL_PASS=your_app_password
heroku config:set EMAIL_TO=admissions@yuvasschool.edu
heroku config:set EMAIL_CC=yuvasriram2909@gmail.com
heroku config:set NODE_ENV=production
```

3. **Deploy**
```bash
git push heroku main
```

4. **View Logs**
```bash
heroku logs --tail
```

---

### Option 2: Deploy to AWS EC2

**Prerequisites:**
- AWS account
- EC2 instance (Ubuntu/Node.js AMI)
- SSH access to instance

**Steps:**

1. **Connect to Instance**
```bash
ssh -i your-key.pem ubuntu@your-instance-ip
```

2. **Install Dependencies**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs npm
```

3. **Clone & Setup**
```bash
git clone your-repo-url
cd school
npm install
```

4. **Create .env File**
```bash
sudo nano .env
# Add your configuration
```

5. **Install PM2 (Process Manager)**
```bash
sudo npm install -g pm2
pm2 start server.js --name "yuvas-school"
pm2 startup
pm2 save
```

6. **Setup Nginx Reverse Proxy**
```bash
sudo apt-get install -y nginx
sudo systemctl start nginx
```

Edit `/etc/nginx/sites-available/default`:
```nginx
location /api/ {
    proxy_pass http://localhost:5000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}
```

7. **Setup SSL with Let's Encrypt**
```bash
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

---

### Option 3: Deploy to DigitalOcean App Platform

**Prerequisites:**
- DigitalOcean account
- App Platform enabled

**Steps:**

1. **Connect GitHub Repository**
- Go to DigitalOcean App Platform
- Click "Create App"
- Select your GitHub repository

2. **Configure**
- Set runtime to Node.js 18
- HTTP Port: 5000

3. **Add Environment Variables**
- EMAIL_USER: yuvasriram2909@gmail.com
- EMAIL_PASS: your_app_password
- EMAIL_TO: admissions@yuvasschool.edu
- EMAIL_CC: yuvasriram2909@gmail.com
- NODE_ENV: production

4. **Deploy**
- Click "Deploy"
- Wait for deployment to complete

---

### Option 4: Deploy to Render

**Prerequisites:**
- Render account
- GitHub repository

**Steps:**

1. **Create New Service**
- Go to Render Dashboard
- Click "New +"
- Select "Web Service"

2. **Connect Repository**
- Select your GitHub repository
- Select branch: main

3. **Configure**
- Name: yuvas-school-backend
- Environment: Node
- Build Command: `npm install`
- Start Command: `node server.js`

4. **Set Environment Variables**
```
EMAIL_USER=yuvasriram2909@gmail.com
EMAIL_PASS=your_app_password
EMAIL_TO=admissions@yuvasschool.edu
EMAIL_CC=yuvasriram2909@gmail.com
NODE_ENV=production
```

5. **Deploy**
- Click "Create Web Service"

---

## 🔐 Production Checklist

- [ ] Enable HTTPS/SSL
- [ ] Set `NODE_ENV=production`
- [ ] Configure proper email credentials
- [ ] Setup rate limiting
- [ ] Enable CORS for specific origins only
- [ ] Setup logging & monitoring
- [ ] Configure backup strategy
- [ ] Setup uptime monitoring
- [ ] Enable email forwarding
- [ ] Setup error tracking (Sentry)

---

## 📊 Monitoring & Logging

### Sentry Integration (Error Tracking)

```bash
npm install @sentry/node
```

Add to `server.js`:
```javascript
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: process.env.NODE_ENV
});
```

### Log Rotation

Use `winston` for better logging:
```bash
npm install winston
```

---

## 🆘 Troubleshooting Deployments

### Issue: App crashes after deployment
- Check environment variables are set
- Review logs for errors
- Verify port configuration

### Issue: Emails not sending
- Verify EMAIL credentials
- Check Gmail App Password
- Ensure 2-Step Verification is enabled

### Issue: CORS errors
- Update CORS_ORIGIN to match frontend domain
- Verify frontend URL in environment

---

## 📈 Performance Tips

1. **Enable Caching**
   - Cache static assets
   - Set appropriate headers

2. **Database Connection Pooling**
   - Configure connection pool
   - Set timeouts appropriately

3. **Load Testing**
   ```bash
   npm install -g artillery
   artillery quick --count 100 --num 1000 http://your-api.com
   ```

4. **CDN Integration**
   - Use CloudFlare for API caching
   - Setup edge locations

---

## 🔄 CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - name: Deploy to Production
        run: |
          # Add your deployment command here
          echo "Deploying..."
```

---

## 📞 Support

For deployment issues, contact:
- **Email:** yuvasriram2909@gmail.com
- **Support:** admissions@yuvasschool.edu

---

**Last Updated:** 2026-06-19  
© 2026 YUVA'S SCHOOL. All Rights Reserved.
