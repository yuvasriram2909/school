# 🎓 YUVA'S SCHOOL - Complete Backend Setup Guide

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Environment Configuration](#environment-configuration)
4. [Running the Server](#running-the-server)
5. [API Endpoints](#api-endpoints)
6. [Database](#database)
7. [Email Configuration](#email-configuration)
8. [Deployment](#deployment)
9. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before starting, ensure you have:
- **Node.js** v14 or higher ([Download](https://nodejs.org/))
- **npm** v6 or higher (comes with Node.js)
- **Gmail Account** (for email sending)
- **Text Editor** (VS Code, Sublime, etc.)

Check if Node.js is installed:
```bash
node --version
npm --version
```

---

## Installation

### Step 1: Install Dependencies

Navigate to your project directory and run:
```bash
npm install
```

This will install all required packages:
- **express** - Web framework
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variables management
- **nodemailer** - Email sending
- **express-validator** - Form validation
- **helmet** - Security middleware
- **body-parser** - Request body parsing
- **sqlite3** - Database
- **nodemon** - Development auto-reload (dev only)

---

## Environment Configuration

### Step 1: Create .env File

Copy the `.env.example` file to `.env`:
```bash
cp .env.example .env
```

### Step 2: Configure Environment Variables

Open `.env` and update the values:

```env
# Server
NODE_ENV=development
PORT=5000

# Email Settings (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@yuvasschool.edu
EMAIL_TO=admissions@yuvasschool.edu
EMAIL_CC=info@yuvasschool.edu

# School Info
SCHOOL_NAME=YUVA'S SCHOOL
SCHOOL_PHONE=+91-XXX-XXX-XXXX
```

### Step 3: Set Up Gmail App Password

1. Go to [Google Account Security Settings](https://myaccount.google.com/security)
2. Enable 2-Step Verification (if not already enabled)
3. Go to [App Passwords](https://myaccount.google.com/apppasswords)
4. Select "Mail" and "Windows Computer" (or your device)
5. Copy the 16-character password
6. Paste it in `.env` as `EMAIL_PASS` (remove spaces)

**Example:**
```
EMAIL_USER=myschool@gmail.com
EMAIL_PASS=abcdefghijklmnop
```

---

## Running the Server

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

### Expected Output
```
╔════════════════════════════════════════════════════════════╗
║         🎓 YUVA'S SCHOOL - Backend Server                 ║
║  ✓ Server running on http://localhost:5000                ║
║  ✓ Environment: development                               ║
║  ✓ Database: Connected & Ready                            ║
║  ✓ Email Service: Configured                              ║
║  ✓ Logging: Enabled                                       ║
╚════════════════════════════════════════════════════════════╝
```

---

## API Endpoints

### 1. Contact Form
**Endpoint:** `POST /api/contact`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91-XXXXXXXXXX",
  "subject": "Inquiry about admission",
  "message": "I would like to know more about your school..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Your message has been sent successfully!",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "submittedAt": "2026-06-19T10:30:00Z"
  }
}
```

### 2. Admission Form
**Endpoint:** `POST /api/admissions`

**Request Body:**
```json
{
  "studentName": "Alice Smith",
  "parentName": "Robert Smith",
  "email": "robert@example.com",
  "phone": "+91-XXXXXXXXXX",
  "classApplying": "V",
  "message": "Optional message..."
}
```

**Valid Classes:** Nursery, LKG, UKG, I, II, III, IV, V, VI, VII, VIII, IX, X

**Response:**
```json
{
  "success": true,
  "message": "Your admission application has been submitted successfully!",
  "data": {
    "id": 1,
    "studentName": "Alice Smith",
    "parentName": "Robert Smith",
    "email": "robert@example.com",
    "classApplying": "V",
    "submittedAt": "2026-06-19T10:30:00Z"
  }
}
```

### 3. Health Check
**Endpoint:** `GET /api/health`

**Response:**
```json
{
  "success": true,
  "message": "Server is healthy",
  "timestamp": "2026-06-19T10:30:00Z",
  "uptime": 3600
}
```

### 4. Get Statistics (Admin)
**Endpoint:** `GET /api/admin/stats`

**Response:**
```json
{
  "success": true,
  "data": {
    "contact_submissions": 42,
    "admission_submissions": 28,
    "admission_by_status": [
      { "status": "pending", "count": 15 },
      { "status": "under-review", "count": 10 },
      { "status": "approved", "count": 3 }
    ]
  }
}
```

### 5. Get Contact Submissions (Admin)
**Endpoint:** `GET /api/admin/contact-submissions?page=1&limit=50`

### 6. Get Admission Submissions (Admin)
**Endpoint:** `GET /api/admin/admission-submissions?status=pending&page=1&limit=50`

### 7. Update Admission Status (Admin)
**Endpoint:** `PUT /api/admin/admission/:id/status`

**Request Body:**
```json
{
  "status": "approved",
  "notes": "Approved based on test scores"
}
```

**Valid Statuses:** pending, under-review, approved, rejected, completed

### 8. Database Backup (Admin)
**Endpoint:** `POST /api/admin/backup`

**Response:**
```json
{
  "success": true,
  "data": {
    "backupPath": "./data/backups/school_2026-06-19T10-30-00Z.db",
    "timestamp": "2026-06-19T10:30:00Z"
  }
}
```

---

## Database

### Database Structure

The backend uses SQLite with the following tables:

#### Contact Submissions Table
- `id` - Unique identifier
- `name` - Contact name
- `email` - Contact email
- `phone` - Contact phone
- `subject` - Message subject
- `message` - Full message
- `ip_address` - Sender's IP
- `user_agent` - Browser info
- `status` - new/read/replied
- `created_at` - Submission timestamp
- `updated_at` - Last update timestamp
- `notes` - Internal notes

#### Admission Submissions Table
- `id` - Unique identifier
- `student_name` - Student name
- `parent_name` - Parent name
- `email` - Parent email
- `phone` - Parent phone
- `class_applying` - Target class
- `message` - Additional info
- `ip_address` - Sender's IP
- `user_agent` - Browser info
- `status` - pending/under-review/approved/rejected/completed
- `created_at` - Submission timestamp
- `updated_at` - Last update timestamp
- `notes` - Internal notes

#### Email Logs Table
- `id` - Log entry ID
- `recipient_email` - Email recipient
- `subject` - Email subject
- `email_type` - contact/admission/confirmation
- `status` - sent/failed
- `message_id` - SMTP message ID
- `error_message` - Error details if failed
- `created_at` - Log timestamp

### Database Location
By default, the database is stored at:
```
./data/school.db
```

### Database Backups
Backups are automatically created in:
```
./data/backups/
```

---

## Email Configuration

### How Email Works

1. **Contact Form Submissions:**
   - Email 1: School receives notification
   - Email 2: User receives confirmation

2. **Admission Form Submissions:**
   - Email 1: School receives application
   - Email 2: Parent receives confirmation

### Testing Email

Use an API testing tool like **Postman** or **Insomnia**:

```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+91-9999999999",
    "subject": "Test Subject",
    "message": "This is a test message to verify email functionality"
  }'
```

### Email Troubleshooting

**Problem: "Email credentials are not configured"**
- Solution: Set `EMAIL_USER` and `EMAIL_PASS` in `.env`

**Problem: "Email transporter verification failed"**
- Solution: 
  - Verify Gmail credentials are correct
  - Check if 2-Step Verification is enabled
  - Use an App Password (not regular password)
  - Remove spaces from App Password

**Problem: Emails not sending**
- Check Gmail's "Less secure app access" is enabled (if not using App Password)
- Verify recipient email address is correct
- Check logs in `./logs/server.log`

---

## Deployment

### Deploy to Heroku

1. **Create Heroku Account**
   - Go to [Heroku](https://www.heroku.com/)
   - Sign up and create an app

2. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

3. **Initialize Git**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

4. **Deploy**
   ```bash
   heroku login
   heroku create your-app-name
   heroku config:set NODE_ENV=production
   heroku config:set EMAIL_USER=your-email@gmail.com
   heroku config:set EMAIL_PASS=your-app-password
   git push heroku main
   ```

5. **Check Logs**
   ```bash
   heroku logs --tail
   ```

### Deploy to AWS EC2

1. **Launch EC2 Instance**
   - Use Ubuntu 20.04 LTS
   - Open ports: 80, 443, 5000

2. **Install Dependencies**
   ```bash
   sudo apt-get update
   sudo apt-get install nodejs npm
   sudo apt-get install git
   ```

3. **Clone Repository**
   ```bash
   git clone <your-repo-url>
   cd your-project
   npm install
   ```

4. **Create .env File**
   ```bash
   nano .env
   ```

5. **Install PM2** (for process management)
   ```bash
   sudo npm install -g pm2
   pm2 start server.js --name "yuvas-school"
   pm2 startup
   pm2 save
   ```

6. **Set Up Nginx Reverse Proxy**
   ```bash
   sudo apt-get install nginx
   sudo nano /etc/nginx/sites-available/default
   ```

   Add:
   ```nginx
   upstream app {
     server 127.0.0.1:5000;
   }

   server {
     listen 80 default_server;
     server_name _;

     location / {
       proxy_pass http://app;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
     }
   }
   ```

7. **Restart Nginx**
   ```bash
   sudo systemctl restart nginx
   ```

---

## Troubleshooting

### Issue: "Port 5000 is already in use"
**Solution:** Kill the process using the port:
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5000
kill -9 <PID>
```

### Issue: "Database locked"
**Solution:** Close other database connections or restart the server

### Issue: "Cannot find module..."
**Solution:** Reinstall dependencies:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: CORS errors
**Solution:** Update `CORS_ORIGIN` in `.env`:
```env
CORS_ORIGIN=http://localhost:3000,https://yourdomain.com
```

### Issue: Server won't start
**Solution:** Check logs:
```bash
npm start  # Will show errors in console
```

---

## Support & Documentation

- **Express.js**: https://expressjs.com/
- **Nodemailer**: https://nodemailer.com/
- **SQLite**: https://www.sqlite.org/
- **Node.js**: https://nodejs.org/

---

## License

MIT License © 2026 YUVA'S SCHOOL

All Rights Reserved
