#!/bin/bash

# 🎓 YUVA'S SCHOOL - Backend Quick Start Script
# This script helps you get the backend running in 5 minutes

echo "╔════════════════════════════════════════════════════════════╗"
echo "║  🎓 YUVA'S SCHOOL - Backend Quick Start                   ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Check Node.js
echo "✓ Checking Node.js..."
if ! command -v node &> /dev/null; then
    echo "✗ Node.js not found. Please install from https://nodejs.org/"
    exit 1
fi
echo "  Node version: $(node --version)"
echo "  npm version: $(npm --version)"
echo ""

# Install dependencies
echo "✓ Installing dependencies..."
if [ ! -d "node_modules" ]; then
    npm install
else
    echo "  Dependencies already installed"
fi
echo ""

# Check .env file
echo "✓ Checking environment configuration..."
if [ ! -f ".env" ]; then
    if [ -f ".env.example" ]; then
        cp .env.example .env
        echo "  Created .env from .env.example"
        echo "  ⚠ Please edit .env with your Gmail credentials:"
        echo "    EMAIL_USER=your-email@gmail.com"
        echo "    EMAIL_PASS=your-app-password"
    fi
else
    echo "  .env file already exists"
fi
echo ""

# Create data directory
echo "✓ Setting up data directories..."
mkdir -p data/backups
mkdir -p logs
mkdir -p uploads
echo "  Created directories: data/, logs/, uploads/"
echo ""

echo "╔════════════════════════════════════════════════════════════╗"
echo "║                    SETUP COMPLETE ✓                        ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "📝 NEXT STEPS:"
echo ""
echo "1. Edit .env file and add your Gmail credentials:"
echo "   EMAIL_USER=your-email@gmail.com"
echo "   EMAIL_PASS=your-16-char-app-password"
echo ""
echo "2. Start the development server:"
echo "   npm run dev"
echo ""
echo "3. The server will run at:"
echo "   http://localhost:5000"
echo ""
echo "4. Test the API with curl or Postman:"
echo "   curl http://localhost:5000/api/health"
echo ""
echo "📚 Documentation:"
echo "   - COMPLETE_BACKEND_GUIDE.md"
echo "   - BACKEND_SETUP_GUIDE.md"
echo ""
