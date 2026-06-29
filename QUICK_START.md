# ⚡ QUICK START - YUVA'S SCHOOL Backend

## 5-Minute Setup

### Step 1: Open Terminal
```bash
cd c:\Users\testm\Documents\school
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Gmail

1. Go to: https://myaccount.google.com/
2. Click **Security** in left sidebar
3. Enable **2-Step Verification** (if not enabled)
4. Go back to Security
5. Find **App Passwords** (appears after 2-Step setup)
6. Select: **Mail** and **Windows Computer**
7. Copy the 16-character password

### Step 4: Update .env File

Open `.env` file and replace:
```
EMAIL_PASS=your_app_password_here
```

with your copied password:
```
EMAIL_PASS=xxxx xxxx xxxx xxxx
```

**⚠️ IMPORTANT:** The email is already configured as:
- **From:** yuvasriram2909@gmail.com
- **School Email:** admissions@yuvasschool.edu
- **CC:** yuvasriram2909@gmail.com

### Step 5: Start Server

**Option A - Development Mode (Recommended):**
```bash
npm run dev
```

**Option B - Production Mode:**
```bash
npm start
```

### Step 6: Test It

Open browser and visit:
```
http://localhost:5000/api/health
```

You should see:
```json
{
  "success": true,
  "message": "Server is healthy",
  "timestamp": "2026-06-19T12:00:00.000Z",
  "uptime": 5.123
}
```

---

## ✅ What's Now Working

### Frontend Forms
- **Contact Form** - Users can send inquiries
- **Admission Form** - Parents can apply for admission
- Both forms have validation and error handling

### Automatic Emails
When forms are submitted:

1. **School receives email with:**
   - User details
   - Full message/application
   - Contact information

2. **User receives confirmation email with:**
   - Thank you message
   - Next steps
   - School contact info

### Email Configuration
- **Email Address:** yuvasriram2909@gmail.com
- **Receives:** All contact and admission forms
- **Sends:** Confirmation emails to users

---

## 📱 Using the Website

### Contact Form
1. Scroll to **Contact** section
2. Fill out the form
3. Click **Send Message**
4. See confirmation notification
5. Check email for confirmation

### Admission Form
1. Scroll to **Admissions** section
2. Fill out the form
3. Click **Submit Application**
4. See success popup
5. Check email for confirmation

---

## 🐛 If Something Doesn't Work

### "Server won't start"
```bash
# Check if port 5000 is in use
# Try a different port:
PORT=5001 npm run dev
```

### "Emails not sending"
- Verify Gmail 2-Step Verification is ON
- Check EMAIL_PASS in .env is correct
- Try a fresh App Password

### "CORS errors"
- Make sure server is running (npm run dev)
- Check browser console for actual error

### "Forms not submitting"
- Open browser console (F12)
- Check for JavaScript errors
- Verify server is running on port 5000

---

## 📞 Contact Information

- **Email:** yuvasriram2909@gmail.com
- **School Email:** admissions@yuvasschool.edu
- **Phone:** 8142082909

---

## 📚 Full Documentation

- See **README.md** for complete setup guide
- See **DEPLOYMENT.md** for production deployment
- See **API-TESTING.js** for testing examples

---

## 🎉 You're All Set!

Your YUVA'S SCHOOL backend is now ready to handle contact forms and admission applications!

Questions? Check the README.md or contact yuvasriram2909@gmail.com
