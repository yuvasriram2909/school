# YUVA'S SCHOOL - Backend Setup Guide

## 📋 Overview

This is a Node.js/Express backend for the YUVA'S SCHOOL website. It handles:
- **Contact Form Submissions** - Send inquiries via the contact form
- **Admission Applications** - Process student admission applications  
- **Email Notifications** - Send confirmation emails to users and admins
- **Email Integration** - Integrated with Gmail SMTP

---

## 🚀 Quick Start

### 1. **Install Dependencies**

```bash
npm install
```

This will install all required packages:
- `express` - Web framework
- `nodemailer` - Email service
- `express-validator` - Form validation
- `cors` - Cross-origin resource sharing
- `helmet` - Security middleware
- `dotenv` - Environment variables

### 2. **Configure Email (.env file)**

The `.env` file contains all configuration:

```env
# Email Configuration
EMAIL_USER=yuvasriram2909@gmail.com
EMAIL_PASS=your_app_password_here
EMAIL_FROM=yuvasriram2909@gmail.com
EMAIL_TO=admissions@yuvasschool.edu
EMAIL_CC=yuvasriram2909@gmail.com
```

**Important:** Gmail App Password Setup
- Go to [Google Account Settings](https://myaccount.google.com/)
- Enable 2-Step Verification
- Go to App Passwords
- Select "Mail" and "Windows Computer" (or your device)
- Generate a 16-character password
- Paste this in `EMAIL_PASS` in `.env`

### 3. **Start the Server**

**Development Mode** (with auto-reload):
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

The server will start on `http://localhost:5000`

---

## 🔌 API Endpoints

### Health Check
```
GET /api/health
```
Check if the server is running.

### Contact Form
```
POST /api/contact
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91-9876543210",
  "subject": "Inquiry about admission",
  "message": "I would like to know more about Class X admission"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Your message has been sent successfully!",
  "data": {
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Inquiry about admission",
    "submittedAt": "2026-06-19T12:00:00.000Z"
  }
}
```

### Admissions
```
POST /api/admissions
```

**Request Body:**
```json
{
  "studentName": "Arjun Kumar",
  "parentName": "Ramesh Kumar",
  "email": "ramesh@example.com",
  "phone": "+91-9876543210",
  "classApplying": "VI",
  "message": "Our son is very interested in sports"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Your admission application has been submitted successfully!",
  "data": {
    "studentName": "Arjun Kumar",
    "parentName": "Ramesh Kumar",
    "email": "ramesh@example.com",
    "classApplying": "VI",
    "submittedAt": "2026-06-19T12:00:00.000Z"
  }
}
```

### Get Available Classes
```
GET /api/admissions/classes
```

**Response:**
```json
{
  "success": true,
  "message": "Available classes for admission",
  "data": [
    { "value": "Nursery", "label": "Nursery (Ages 3-4)" },
    { "value": "LKG", "label": "LKG (Ages 4-5)" },
    ...
  ]
}
```

---

## 📧 Email Features

### Contact Form Emails
When a contact form is submitted:
1. **Admin Email** - School admissions team receives full details
2. **Confirmation Email** - User receives confirmation their message was received

### Admission Form Emails
When an admission application is submitted:
1. **Application Email** - School receives complete application details
2. **Confirmation Email** - Parent receives confirmation and next steps

All emails include:
- Professional HTML formatting
- Gold & dark theme matching website
- Auto-response with school contact info
- Reference numbers for tracking

---

## 🔒 Security Features

- **Helmet.js** - Sets HTTP security headers
- **CORS** - Configured to accept requests from authorized origins
- **Input Validation** - All form inputs validated with express-validator
- **Email Sanitization** - Normalizes and validates all email addresses
- **Rate Limiting** - Ready for rate limiting implementation

---

## 📁 Project Structure

```
school/
├── server.js                 # Main server file
├── package.json             # Dependencies & scripts
├── .env                     # Configuration (SECRET!)
├── api-client.js            # Frontend API client
├── form-handler.js          # Frontend form submission handler
├── form-styles.css          # Form styling
├── routes/
│   ├── health.js           # Health check endpoint
│   ├── contact.js          # Contact form endpoint
│   └── admissions.js       # Admissions form endpoint
├── utils/
│   └── emailService.js     # Email sending service
├── index.html              # Frontend
├── script.js               # Frontend interactivity
└── style.css               # Frontend styles
```

---

## 🧪 Testing

### Test Contact Form
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+91-9876543210",
    "subject": "Test",
    "message": "This is a test message"
  }'
```

### Test Admissions
```bash
curl -X POST http://localhost:5000/api/admissions \
  -H "Content-Type: application/json" \
  -d '{
    "studentName": "Test Student",
    "parentName": "Test Parent",
    "email": "test@example.com",
    "phone": "+91-9876543210",
    "classApplying": "VI"
  }'
```

---

## ⚙️ Configuration

All settings are in `.env`:

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| NODE_ENV | Environment | development |
| EMAIL_USER | Gmail address for sending | yuvasriram2909@gmail.com |
| EMAIL_PASS | Gmail app password | Required |
| EMAIL_FROM | From address | yuvasriram2909@gmail.com |
| EMAIL_TO | School admissions email | admissions@yuvasschool.edu |
| EMAIL_CC | CC email | yuvasriram2909@gmail.com |
| CORS_ORIGIN | Allowed origin | * |

---

## 🐛 Troubleshooting

### "Email sending failed"
- Check Gmail App Password is correct
- Ensure 2-Step Verification is enabled
- Verify EMAIL_USER and EMAIL_PASS in .env

### "CORS errors"
- Update CORS_ORIGIN in .env to match frontend domain
- Default allows all origins (*)

### "Port already in use"
- Change PORT in .env
- Or kill existing process: `lsof -ti :5000 | xargs kill -9`

### "Validation errors"
- Check all required fields are filled
- Verify email format is correct
- Phone must contain only digits, spaces, or dashes

---

## 📱 Frontend Integration

The frontend includes:
- `api-client.js` - API communication client
- `form-handler.js` - Form submission handler
- Form validation & error handling
- Loading states & notifications
- Success/error feedback to users

---

## 📞 Contact

**School Email:** admissions@yuvasschool.edu  
**Contact Email:** yuvasriram2909@gmail.com  
**Admissions Helpline:** 8142082909

---

## 📝 License

© 2026 YUVA'S SCHOOL. All Rights Reserved.
