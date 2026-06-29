@echo off
REM 🎓 YUVA'S SCHOOL - Backend Quick Start Script (Windows)
REM This script helps you get the backend running in 5 minutes

cls
echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║  🎓 YUVA'S SCHOOL - Backend Quick Start                   ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

REM Check Node.js
echo ✓ Checking Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo ✗ Node.js not found. Please install from https://nodejs.org/
    exit /b 1
)
for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo   Node version: %NODE_VERSION%
echo   npm version: %NPM_VERSION%
echo.

REM Install dependencies
echo ✓ Installing dependencies...
if not exist "node_modules" (
    call npm install
) else (
    echo   Dependencies already installed
)
echo.

REM Check .env file
echo ✓ Checking environment configuration...
if not exist ".env" (
    if exist ".env.example" (
        copy .env.example .env
        echo   Created .env from .env.example
        echo   ⚠ Please edit .env with your Gmail credentials:
        echo     EMAIL_USER=your-email@gmail.com
        echo     EMAIL_PASS=your-app-password
    )
) else (
    echo   .env file already exists
)
echo.

REM Create directories
echo ✓ Setting up data directories...
if not exist "data\backups" mkdir data\backups
if not exist "logs" mkdir logs
if not exist "uploads" mkdir uploads
echo   Created directories: data/, logs/, uploads/
echo.

echo ╔════════════════════════════════════════════════════════════╗
echo ║                    SETUP COMPLETE ✓                        ║
echo ╚════════════════════════════════════════════════════════════╝
echo.
echo 📝 NEXT STEPS:
echo.
echo 1. Edit .env file and add your Gmail credentials:
echo    EMAIL_USER=your-email@gmail.com
echo    EMAIL_PASS=your-16-char-app-password
echo.
echo 2. Start the development server:
echo    npm run dev
echo.
echo 3. The server will run at:
echo    http://localhost:5000
echo.
echo 4. Test the API with curl or Postman:
echo    curl http://localhost:5000/api/health
echo.
echo 📚 Documentation:
echo    - COMPLETE_BACKEND_GUIDE.md
echo    - BACKEND_SETUP_GUIDE.md
echo.
pause
