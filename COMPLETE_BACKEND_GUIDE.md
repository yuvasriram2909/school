# 🚀 Complete Backend Installation & Running Guide

## Quick Start (5 Minutes)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure Email
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Get Gmail App Password:
   - Go to https://myaccount.google.com/apppasswords
   - Select Mail & Windows Computer
   - Copy the 16-digit password

3. Update `.env`:
   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=xxxxxxxxxxxx
   EMAIL_TO=admissions@yuvasschool.edu
   ```

### Step 3: Run the Server
```bash
npm run dev
```

✅ Server is now running at `http://localhost:5000`

---

## Complete Directory Structure

```
school/
├── config/
│   └── database.js              ✨ NEW - Database management
├── middleware/
│   ├── errorHandler.js          ✨ NEW - Error handling
│   ├── logger.js                ✨ NEW - Request logging
│   └── validation.js            ✨ NEW - Form validation
├── routes/
│   ├── contact.js               ✅ Updated - Database integration
│   ├── admissions.js            ✅ Updated - Database integration
│   ├── health.js                ✅ Existing
│   └── admin.js                 ✨ NEW - Admin endpoints
├── utils/
│   └── emailService.js          ✅ Existing
├── data/                        ✨ NEW - Auto-created
│   ├── school.db               (Database file)
│   └── backups/                (Database backups)
├── logs/                        ✨ NEW - Auto-created
│   └── server.log              (Server logs)
├── .env                         ✨ NEW - Environment config
├── .env.example                ✨ NEW - Config template
├── server.js                    ✅ Updated - Enhanced startup
├── package.json                 ✅ Updated - New dependencies
├── index.html                   ✅ Existing - Frontend
├── script.js                    ✅ Existing - Frontend
├── style.css                    ✅ Existing - Styling
└── README.md                    ✅ Existing - Documentation
```

---

## What's New in This Complete Backend

### ✨ New Features

1. **Database (SQLite)**
   - Persistent storage for submissions
   - Automatic schema creation
   - Email logging
   - Admin statistics

2. **Admin Panel Routes**
   - View all submissions
   - Filter by status
   - Update submission status
   - Get statistics
   - Create database backups

3. **Enhanced Middleware**
   - Request logging
   - Error handling
   - Form validation
   - Daily log rotation

4. **Email Integration**
   - Database logging of emails
   - Error tracking
   - Confirmation emails

5. **Graceful Shutdown**
   - Database cleanup
   - Proper process termination

---

## API Testing Examples

### Test Contact Form
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+91-9999999999",
    "subject": "Inquiry",
    "message": "I am interested in admission for my child"
  }'
```

### Test Admission Form
```bash
curl -X POST http://localhost:5000/api/admissions \
  -H "Content-Type: application/json" \
  -d '{
    "studentName": "Alice",
    "parentName": "Robert Smith",
    "email": "robert@example.com",
    "phone": "+91-9999999999",
    "classApplying": "V",
    "message": "Please consider our application"
  }'
```

### Get Admin Statistics
```bash
curl http://localhost:5000/api/admin/stats
```

### Get All Contact Submissions
```bash
curl http://localhost:5000/api/admin/contact-submissions?page=1&limit=10
```

---

## Environment Variables Reference

```env
# Server Configuration
NODE_ENV=development              # development or production
PORT=5000                        # Server port
HOST=localhost                   # Server host

# CORS
CORS_ORIGIN=*                    # Allowed origins

# Email Configuration
EMAIL_USER=your-email@gmail.com  # Gmail address
EMAIL_PASS=xxxxxxxxxxxx         # Gmail App Password (16 chars)
EMAIL_FROM=noreply@yuvasschool.edu
EMAIL_TO=admissions@yuvasschool.edu
EMAIL_CC=info@yuvasschool.edu
SCHOOL_NAME=YUVA'S SCHOOL
SCHOOL_PHONE=+91-XXX-XXX-XXXX

# Database
DATABASE_PATH=./data/school.db
DATABASE_BACKUP_PATH=./data/backups

# Logging
LOG_LEVEL=info
LOG_FILE=./logs/server.log
```

---

## File Descriptions

| File | Purpose |
|------|---------|
| `server.js` | Main Express application & startup |
| `config/database.js` | SQLite database initialization & operations |
| `routes/contact.js` | Contact form API endpoint |
| `routes/admissions.js` | Admission form API endpoint |
| `routes/health.js` | Health check endpoint |
| `routes/admin.js` | Admin panel endpoints |
| `middleware/errorHandler.js` | Global error handling |
| `middleware/logger.js` | Request logging & file rotation |
| `middleware/validation.js` | Form validation rules |
| `utils/emailService.js` | Email sending via Gmail SMTP |
| `.env` | Environment configuration |
| `package.json` | Node.js dependencies |

---

## Common Commands

```bash
# Start development server with auto-reload
npm run dev

# Start production server
npm start

# View logs (Linux/Mac)
tail -f logs/server.log

# Install dependencies
npm install

# Update dependencies
npm update

# Reinstall everything (if issues)
rm -rf node_modules package-lock.json && npm install
```

---

## Database Queries (Manual Access)

You can manually query the database using sqlite3 CLI:

```bash
# Open database
sqlite3 data/school.db

# View all tables
.tables

# Count submissions
SELECT COUNT(*) FROM contact_submissions;
SELECT COUNT(*) FROM admission_submissions;

# View recent submissions
SELECT * FROM contact_submissions ORDER BY created_at DESC LIMIT 5;

# Exit
.exit
```

---

## Production Deployment Checklist

- [ ] Update `NODE_ENV=production` in `.env`
- [ ] Set strong `EMAIL_PASS`
- [ ] Update `CORS_ORIGIN` with your domain
- [ ] Verify email configuration works
- [ ] Set up daily database backups
- [ ] Configure SSL/HTTPS
- [ ] Set up error monitoring
- [ ] Configure log rotation
- [ ] Set up uptime monitoring
- [ ] Test all API endpoints

---

## Support

For issues or questions:
1. Check `./logs/server.log` for errors
2. Review the BACKEND_SETUP_GUIDE.md for detailed info
3. Verify email credentials and 2-Factor Authentication
4. Ensure all dependencies are installed: `npm install`
5. Restart the server: `npm run dev`

---

**Your backend is now fully functional and production-ready! 🎉**
